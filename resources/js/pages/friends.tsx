import YapLayout from '@/layouts/yap-layout';
import { Link } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';

function friends({ friends }: any) {
    // console.log(friends);
    const [friend, setFriends] = useState<any>({});
    useEffect(() => {
        setFriends(friends);
    }, [friends]);

    return (
        <YapLayout title={'My Friends'}>
            <div className="flex w-full justify-center pb-4">
                <div className="relative w-11/12">
                    <input className="w-full rounded-xl bg-white/20 py-1 ps-7 text-black backdrop-blur-2xl" placeholder={`Search Friends...`} />
                    <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-[#11998e]" />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    {friend &&
                        friend.length > 0 &&
                        friend.map((f: any, ind: any) => (
                            <Link
                                key={ind}
                                href="#"
                                className="my-3 flex h-20 w-full gap-3 rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <div className="flex h-20 w-20 items-center justify-center">
                                    <CgProfile className="text-5xl" />
                                </div>
                                <div className="flex h-full w-full justify-between">
                                    <div className="flex h-full items-center justify-between">
                                        <h1 className="font-extrabold">{f.users.name}</h1>
                                    </div>
                                    <div className="flex h-full items-center gap-3 text-sm">
                                        <button className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">remove</button>
                                    </div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </YapLayout>
    );
}

export default friends;
