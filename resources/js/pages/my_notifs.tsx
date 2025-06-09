import YapLayout from '@/layouts/yap-layout';
import { useForm } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

function my_notifs({ auth, notifs }: any) {
    useEcho(`notif-channel.${auth.user.id}`, 'NotifsEvent', (e: any) => {
        if (e.notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    });

    const [notif, setNotifs] = useState<any>({});
    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);
    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);
    const {
        data,
        setData,
        put,
        delete: destroy,
    } = useForm<any>({
        status: 'accept',
    });
    useEffect(() => {
        setNotifs((p: any) => {
            return notifs;
        });
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
        <YapLayout title={'Notifications'} notifs={haveNotifs} auth={auth}>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    {notif && notif.length > 0 ? (
                        notif.map((n: any, ind: any) => (
                            <a
                                key={ind}
                                href={route('yaps.show', n.notifs.id)}
                                className="my-3 flex h-20 w-full gap-3 rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <div className="flex h-20 w-20 items-center justify-center">
                                    <img
                                        className="h-12 w-12 rounded-full object-cover"
                                        src={`${window.location.origin}/storage/images/${n.notifs.profile}`}
                                    />
                                </div>
                                <div className="flex h-full w-full justify-between">
                                    <div className="flex h-full items-center justify-between">
                                        <h1 className="font-extrabold">{n.notifs.name}</h1>
                                    </div>
                                    <div className="me-2 flex items-center gap-1 text-sm">
                                        <form onSubmit={(e) => handleAccept(e, n.id)} className="">
                                            <button type="submit" className="rounded-lg bg-blue-500 px-3 py-1 font-bold">
                                                accept
                                            </button>
                                        </form>
                                        <form onSubmit={(e) => handleRemove(e, n.id)} className="">
                                            <button type="submit" className="rounded-lg bg-gray-500 px-3 py-1 font-bold">
                                                remove
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </a>
                        ))
                    ) : (
                        <h1>No Notifications :(</h1>
                    )}
                </div>
            </div>
        </YapLayout>
    );
}

export default my_notifs;
