import YapLayout from '@/layouts/yap-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

function search_friends({ searched, search, auth, notifs }: any) {
    useEcho(`notif-channel.${auth.user.id}`, 'NotifsEvent', (e: any) => {
        if (e.notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    });

    const { data, setData, post, delete: destroy } = useForm<any>();
    const [friend, setFriends] = useState<any>();
    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);
    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);

    useEffect(() => {
        setFriends(searched);
    }, [searched]);

    const handleAddFriend = (e: any, id: any) => {
        e.preventDefault();
        console.log(id);
        post(route('friends.store'));
    };

    const handleRemove = (e: any, id: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this friend?')) {
            console.log(id);
            destroy(route('friends.destroy', id));
        }
    };
    console.log(searched);
    return (
        <YapLayout title={'Searched Friend'} notifs={haveNotifs} auth={auth}>
            <Head title={'Searched Friends'} />
            <div className="flex w-full justify-center pb-4">
                <div className="w-11/12 pb-20">
                    {friend && friend.length > 0 ? (
                        friend.map((f: any, ind: any) => (
                            <div
                                key={ind}
                                //
                                className="my-3 flex h-20 w-full gap-3 rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <Link href={route('other_profile', f.id)} className="flex h-20 w-20 items-center justify-center">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover"
                                        src={`${window.location.origin}/storage/images/${f.profile}`}
                                    />
                                </Link>
                                <div className="flex h-full w-full items-center justify-between">
                                    <Link href={route('yaps.show', f.id)} className="flex h-full w-full items-center justify-between">
                                        <h1 className="font-extrabold">{f.name}</h1>
                                    </Link>
                                    <div className="flex h-full items-center text-sm">
                                        {f.friend.length > 0 ? (
                                            f.friend[0].status == 'accepted' ? (
                                                <form
                                                    onSubmit={(e) => handleRemove(e, f.friend[0].id)}
                                                    className="flex h-full items-center gap-3 text-sm"
                                                >
                                                    <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                                        Remove
                                                    </button>
                                                </form>
                                            ) : (
                                                <form onSubmit={(e) => handleRemove(e, f.friend[0].id)}>
                                                    <button type="submit" className="me-3 rounded-lg bg-[coral] px-3 py-1 font-bold">
                                                        Pending
                                                    </button>
                                                </form>
                                            )
                                        ) : (
                                            <form onSubmit={(e) => handleAddFriend(e, f.id)}>
                                                <button
                                                    type="submit"
                                                    className="me-3 rounded-lg bg-blue-500 px-2 py-1 font-bold whitespace-nowrap"
                                                    onClick={(e) => setData('id', f.id)}
                                                >
                                                    Add Friend
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <h1>No such users with the name of {search}</h1>
                    )}
                </div>
            </div>
        </YapLayout>
    );
}

export default search_friends;
