import YapLayout from '@/layouts/yap-layout';
import { Link, useForm } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';

function yap({ user, yaps, auth, notifs }: any) {
    useEcho(`notif-channel.${auth.user.id}`, 'NotifsEvent', (e: any) => {
        if (e.notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    });

    useEcho(`message-channel.${auth.user.id}`, 'MessageEvent', (e: any) => {
        if (e.sender_id === user.id) {
            setYaps((p: any) => {
                if (p.length > 0) {
                    let res = [{ message: e.message, sender_user: { id: user.id, name: user.name } }, ...p];
                    return res;
                } else {
                    let res = [{ message: e.message, sender_user: { id: user.id, name: user.name } }];
                    return res;
                }
            });
        }
    });
    const [yap, setYaps] = useState<any>({});
    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);
    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);

    useEffect(() => {
        if (yaps.length > 0) {
            setYaps(yaps[0].yaps);
        }
    }, [yaps]);

    const { data, setData, post } = useForm<any>({
        message: '',
        receiverId: user.id,
    });
    const handleSend = (e: any) => {
        e.preventDefault();
        post(route('yaps.store'), {
            onFinish: () => {
                setData('message', '');
            },
        });
    };
    return (
        <YapLayout title={`Chatting with ${user.name}`} notifs={haveNotifs} auth={auth}>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-40">
                    <Link href={route('other_profile', user.id)}>
                        <img className="mb-2 h-12 w-12 rounded-full object-cover" src={`${window.location.origin}/storage/images/${user.profile}`} />
                    </Link>
                    {yap && yap.length > 0 ? (
                        yap.map((y: any, ind: any) => (
                            <div
                                key={ind}
                                className={`${y.sender_user.id === auth.user.id && 'ms-auto'} mb-3 w-5/12 rounded-lg bg-white/20 p-3 text-sm break-words`}
                            >
                                <h1 className="font-extrabold">{y.sender_user.name}</h1>
                                <h1 className="">{y.message}</h1>
                            </div>
                        ))
                    ) : (
                        <h1>Start chatting!!!</h1>
                    )}
                </div>
            </div>
            <form onSubmit={(e) => handleSend(e)} className="fixed bottom-1/12 flex h-1/12 w-full items-center justify-center gap-3 backdrop-blur-sm">
                <input value={data.message} onChange={(e) => setData('message', e.target.value)} className="rounded-lg bg-[#11998e] p-1 ps-2" />
                <button type="submit" className="rounded-md bg-[#11998e] px-3 py-1 text-sm font-bold text-white">
                    Send
                </button>
            </form>
        </YapLayout>
    );
}

export default yap;
