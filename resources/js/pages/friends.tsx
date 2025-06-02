import YapLayout from '@/layouts/yap-layout';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';

function friends({ friends, auth, notifs }: any) {
    const [friend, setFriends] = useState<any>({});
    const {
        data,
        setData,
        delete: destroy,
    } = useForm<any>({
        name: '',
    });

    useEffect(() => {
        setFriends(friends);
    }, [friends]);

    const handleRemove = (e: any, id: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this friend?')) {
            console.log(id);
            destroy(route('friends.destroy', id));
        }
    };

    return (
        <YapLayout title={'My Friends'} notifs={notifs.length > 0 ? true : false}>
            <div className="flex w-full justify-center pb-4">
                <form action={route('searchFriends', data.name)} className="relative w-11/12">
                    <input
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full rounded-xl bg-white/20 py-1 ps-7 text-black backdrop-blur-2xl"
                        placeholder={`Search Friends...`}
                    />
                    <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-[#11998e]" />
                </form>
            </div>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    {friend &&
                        friend.length > 0 &&
                        friend.map((f: any, ind: any) => (
                            <a
                                key={ind}
                                href={route('yaps.show', f.users.id)}
                                className="my-3 flex h-20 w-full gap-3 rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <div className="flex h-20 w-20 items-center justify-center">
                                    <CgProfile className="text-5xl" />
                                </div>
                                <div className="flex h-full w-full justify-between">
                                    <div className="flex h-full items-center justify-between">
                                        <h1 className="font-extrabold">{f.users.name}</h1>
                                    </div>
                                    <form onSubmit={(e) => handleRemove(e, f.id)} className="flex h-full items-center gap-3 text-sm">
                                        <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                            remove
                                        </button>
                                    </form>
                                </div>
                            </a>
                        ))}
                </div>
            </div>
        </YapLayout>
    );
}

export default friends;
