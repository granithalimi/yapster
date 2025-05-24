import YapLayout from '@/layouts/yap-layout';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';

function my_notifs({ notifs }: any) {
    const [notif, setNotifs] = useState<any>({});
    const {
        data,
        setData,
        put,
        delete: destroy,
    } = useForm<any>({
        status: 'accept',
    });
    useEffect(() => {
        setNotifs(notifs);
        setData('status', 'accepted');
    }, [notifs]);

    const handleRemove = (e: any, id: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this friend?')) {
            console.log(id);
            destroy(route('friends.destroy', id));
        }
    };

    const handleAccept = (e: any, id: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to accept this friend?')) {
            console.log(id);
            put(route('friends.update', id));
        }
    };
    return (
        <YapLayout title={'Notifications'}>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    {notif && notif.length > 0 ? (
                        notif.map((n: any, ind: any) => (
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
                                        <h1 className="font-extrabold">{n.notifs.name}</h1>
                                    </div>
                                    <form onSubmit={(e) => handleRemove(e, n.id)} className="flex h-full items-center gap-3 text-sm">
                                        <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                            remove
                                        </button>
                                    </form>
                                    <form onSubmit={(e) => handleAccept(e, n.id)} className="flex h-full items-center gap-3 text-sm">
                                        <button type="submit" className="me-3 rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                            accept
                                        </button>
                                    </form>
                                </div>
                            </a>
                        ))
                    ) : (
                        <h1>no notifs</h1>
                    )}
                </div>
            </div>
        </YapLayout>
    );
}

export default my_notifs;
