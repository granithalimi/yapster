import YapLayout from '@/layouts/yap-layout';
import { Head, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';

function search_friends({ searched, search }: any) {
    console.log(searched);
    const { data, setData, post, delete: destroy } = useForm<any>();
    const [friend, setFriends] = useState<any>({
        id: '',
    });

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
    return (
        <YapLayout title={'Searched Friend'}>
            <Head title={'Searched Friends'} />
            <div className="flex w-full justify-center pb-4">
                <div className="w-11/12 pb-20">
                    {friend && friend.length > 0 ? (
                        friend.map((f: any, ind: any) => (
                            <a
                                key={ind}
                                href={route('dashboard')}
                                className="my-3 flex h-20 w-full gap-3 rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <div className="flex h-20 w-20 items-center justify-center">
                                    <CgProfile className="text-5xl" />
                                </div>
                                <div className="flex h-full w-full justify-between">
                                    <div className="flex h-full items-center justify-between">
                                        <h1 className="font-extrabold">{f.name}</h1>
                                    </div>
                                    <div className="flex h-full items-center gap-3 text-sm">
                                        {f.friend.length > 0 ? (
                                            f.friend[0].status == 'accepted' ? (
                                                <form
                                                    onSubmit={(e) => handleRemove(e, f.friend[0].id)}
                                                    className="flex h-full items-center gap-3 text-sm"
                                                >
                                                    <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                                        remove
                                                    </button>
                                                </form>
                                            ) : (
                                                <form onSubmit={(e) => handleRemove(e, f.friend[0].id)}>
                                                    <button type="submit" className="me-3 rounded-lg bg-[coral] px-3 py-1 font-bold">
                                                        pending
                                                    </button>
                                                </form>
                                            )
                                        ) : (
                                            <form onSubmit={(e) => handleAddFriend(e, f.id)}>
                                                <button
                                                    type="submit"
                                                    className="me-3 rounded-lg bg-blue-500 px-3 py-1 font-bold"
                                                    onClick={(e) => setData('id', f.id)}
                                                >
                                                    Add Friend
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </a>
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
