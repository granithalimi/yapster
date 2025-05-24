import YapLayout from '@/layouts/yap-layout';
import { Head, Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';

function search_friends({ searched, search }: any) {
    console.log(searched);
    const [friend, setFriends] = useState<any>({});
    useEffect(() => {
        setFriends(searched);
    }, [searched]);

    const addFriend = (e: any, id: any) => {
        e.preventDefault();
        route('friends.store', id);
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
                                onClick={(e) => console.log('go chatting')}
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
                                                <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                                    remove
                                                </button>
                                            ) : (
                                                <button type="submit" className="me-3 rounded-lg bg-[coral] px-3 py-1 font-bold">
                                                    pending
                                                </button>
                                            )
                                        ) : (
                                            <Link
                                                type="submit"
                                                href={route('friends.store', f.id)}
                                                className="me-3 rounded-lg bg-blue-500 px-3 py-1 font-bold"
                                            >
                                                Add Friend
                                            </Link>
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
