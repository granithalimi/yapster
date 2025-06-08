import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import YapLayout from '@/layouts/yap-layout';
import { Link, router, useForm } from '@inertiajs/react';
import { useEcho } from '@laravel/echo-react';
import { LogOut } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import Webcam from 'react-webcam';

function my_profile({ auth, following, followers, notifs }: any) {
    useEcho(`notif-channel.${auth.user.id}`, 'NotifsEvent', (e: any) => {
        if (e.notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    });
    const cleanup = useMobileNavigation();
    const [followersDiv, setFollowersDiv] = useState(false);
    const [followingDiv, setFollowingDiv] = useState(false);
    const [followings, setFollowing] = useState<any>({});
    const [follower, setFollowers] = useState<any>({});
    const [camera, setCamera] = useState<any>(false);
    const [imgSrc, setImgSrc] = useState<any>(null);
    const webRef = useRef(null);

    const {
        data,
        setData,
        put,
        delete: destroy,
    } = useForm<any>({
        image: '',
    });

    const capture = (e: any) => {
        setImgSrc(e.getScreenshot());
    };

    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);
    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);

    useEffect(() => {
        setFollowing(following);
        setFollowers(followers);
    }, [following, followers]);

    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };

    const handleFollowersClick = (e: any) => {
        setFollowingDiv(false);
        setFollowersDiv(!followersDiv);
    };

    const handleFollowingClick = (e: any) => {
        setFollowersDiv(false);
        setFollowingDiv(!followingDiv);
    };

    const handleRemove = (e: any, id: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this friend?')) {
            console.log(id);
            destroy(route('friends.destroy', id));
        }
    };
    const handleSubmit = (e: any) => {
        e.preventDefault();
        put(route('my_profile.update'));
    };
    // console.log(followers);
    return (
        <YapLayout title={'My Profile'} notifs={haveNotifs} auth={auth}>
            <div className="flex w-full justify-center pb-4">
                <div className={`${followersDiv || followingDiv ? 'rounded-t-lg' : 'rounded-lg'} relative flex h-40 w-11/12 bg-white/20`}>
                    <div className={`${followersDiv ? '' : 'hidden'} absolute top-full h-60 w-full overflow-auto rounded-b-lg bg-white/20`}>
                        {follower &&
                            follower.length > 0 &&
                            follower.map((f: any, ind: any) => (
                                <div key={ind} className="mx-auto mb-3 flex h-16 w-11/12 items-center justify-between rounded-lg bg-white/10 text-sm">
                                    <h1 className="ms-2 font-bold">{f.notifs.name}</h1>
                                    <button onClick={(e) => handleRemove(e, f.id)} className="me-2 rounded-md bg-gray-500 px-3 py-1 font-bold">
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div className={`${followingDiv ? '' : 'hidden'} absolute top-full h-60 w-full overflow-auto rounded-b-lg bg-white/20`}>
                        {followings &&
                            followings.length > 0 &&
                            followings.map((f: any, ind: any) => (
                                <div key={ind} className="mx-auto mb-3 flex h-16 w-11/12 items-center justify-between rounded-lg bg-white/10 text-sm">
                                    <h1 className="ms-2 font-bold">{f.users.name}</h1>
                                    <button onClick={(e) => handleRemove(e, f.id)} className="me-2 rounded-md bg-gray-500 px-3 py-1 font-bold">
                                        Remove
                                    </button>
                                </div>
                            ))}
                    </div>
                    <div className="flex h-full w-2/6 flex-col items-center justify-center gap-2">
                        <button onClick={(e) => setCamera((p: any) => !p)}>
                            <img
                                src={`${window.location.origin}/storage/images/${auth.user.profile}`}
                                alt="profile_pic"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </button>
                        <h1 className="text-sm font-bold">{auth.user.name}</h1>
                    </div>
                    <div className="h-full w-4/6">
                        <div className="flex h-1/2 w-full items-end justify-center gap-5 text-sm">
                            <button onClick={(e) => handleFollowersClick(e)} className="flex flex-col items-center">
                                <p>Followers</p>
                                <p className="text-black">{followers.length}</p>
                            </button>
                            <button onClick={(e) => handleFollowingClick(e)} className="flex flex-col items-center">
                                <p>Following</p>
                                <p className="text-black">{following.length}</p>
                            </button>
                        </div>
                        <div className="mt-5 flex h-1/2 w-full items-start justify-center gap-3">
                            <Link href={route('profile.edit')} className="rounded-lg bg-blue-500 px-10 py-1 text-sm">
                                Edit
                            </Link>
                            <Link
                                className="flex w-1/4 cursor-pointer flex-col items-center rounded-lg bg-red-500 px-2 py-1"
                                method="post"
                                href={route('logout')}
                                as="button"
                                onClick={handleLogout}
                            >
                                <LogOut className="size-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className={`${camera ? 'fixed' : 'hidden'} top-0 flex h-screen w-screen items-center justify-center bg-black/40`}>
                {camera && (
                    <div className={`flex w-10/12 flex-col items-end justify-center gap-5 rounded-xl bg-green-400 pt-4`}>
                        <IoMdClose onClick={(e) => setCamera((p: any) => !p)} className="pe-3 text-3xl" />
                        <Webcam className={`${imgSrc ? 'hidden' : 'block'} w-full`} screenshotFormat="image/jpeg" audio={false} ref={webRef} />
                        {imgSrc && <img src={imgSrc} />}
                        <div className="flex w-full justify-around pb-4">
                            <button className={`${imgSrc ? 'hidden' : 'block'} text-center`} onClick={(e) => capture(webRef.current)}>
                                take the shit
                            </button>
                            <button className={`${imgSrc ? 'block' : 'hidden'} text-center`}>post</button>
                            <button className={`${imgSrc ? 'block' : 'hidden'} text-center`} onClick={(e) => setImgSrc((p: any) => false)}>
                                take another
                            </button>
                        </div>
                    </div>
                )}
            </div>
            <form encType="multipart/form-data" className="flex flex-col items-center" onSubmit={(e) => handleSubmit(e)}>
                <input
                    type="file"
                    onChange={(e) => setData('image', e.target.value)}
                    className="w-44 rounded-lg bg-white py-3 ps-1 text-sm text-black"
                />
                <button>Update</button>
            </form>
        </YapLayout>
    );
}

export default my_profile;
