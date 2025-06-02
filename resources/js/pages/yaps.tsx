import YapLayout from '@/layouts/yap-layout';
import { Link } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { useEffect, useState } from 'react';
import { CgProfile } from 'react-icons/cg';
import { FaSearch } from 'react-icons/fa';

function yaps({ my_convos, auth, notifs }: any) {
    useEcho(`message-channel.${auth.user.id}`, 'MessageEvent', (e: any) => {
        // check if the convo exists
        setConvos((p: any) => {
            const convo = p.find((c: any) => c.sender_id == e.sender_id || c.receiver_id == e.sender_id);
            if (convo) {
                convo.yaps[0].message = e.message;
                return [...p];
            } else {
                const new_convo = {
                    sender_id: e.sender_id,
                    receiver_id: auth.user.id,
                    yaps: [{ message: e.message, receiver_user: { name: auth.user.name }, sender_user: { name: e.sender_name } }],
                };
                return [new_convo, ...p];
            }
        });
    });

    const [convos, setConvos] = useState<any[]>([]);
    useEffect(() => {
        setConvos(my_convos);
    }, [my_convos]);

    return (
        <YapLayout title="Yaps" notifs={notifs.length > 0 ? true : false}>
            <div className="flex w-full justify-center pb-4">
                <div className="relative w-11/12">
                    <input className="w-full rounded-xl bg-white/20 py-1 ps-7 text-black backdrop-blur-2xl" placeholder={`Search Yaps...`} />
                    <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-[#11998e]" />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    {convos &&
                        convos.length > 0 &&
                        convos.map((convo: any, ind: any) => (
                            <Link
                                key={ind}
                                // href={route('yaps.show', convo.receiver_id)}
                                href={convo.sender_id === auth.user.id ? route('yaps.show', convo.receiver_id) : route('yaps.show', convo.sender_id)}
                                className="my-3 flex h-20 w-full gap-3 overflow-hidden rounded-xl bg-white/20 backdrop-blur-3xl duration-300 hover:bg-white/30"
                            >
                                <div className="flex h-20 w-20 items-center justify-center">
                                    <CgProfile className="text-5xl" />
                                </div>
                                <div className="flex h-full w-full flex-col">
                                    <div className="flex h-10 w-full items-center justify-between">
                                        <h1 className="font-extrabold">
                                            {convo.yaps[0].sender_user.name == auth.user.name
                                                ? convo.yaps[0].receiver_user.name
                                                : convo.yaps[0].sender_user.name}
                                        </h1>
                                        {/* <p className="pe-5">{convo.yaps[0].created_at}</p> */}
                                    </div>
                                    <div className="flex h-10 w-full items-center justify-between text-sm">{convo.yaps[0].message}</div>
                                </div>
                            </Link>
                        ))}
                </div>
            </div>
        </YapLayout>
    );
}

export default yaps;
