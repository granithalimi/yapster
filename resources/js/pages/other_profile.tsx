import YapLayout from '@/layouts/yap-layout';
import { Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';

function other_profile({ auth, notifs, following, followers, user, status }: any) {
    const { data, setData, post, delete: destroy } = useForm<any>();
    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);
    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);

    const [followersDiv, setFollowersDiv] = useState(false);
    const [followingDiv, setFollowingDiv] = useState(false);
    const [followings, setFollowing] = useState<any>({});
    const [follower, setFollowers] = useState<any>({});
    const [camera, setCamera] = useState<any>(false);

    useEffect(() => {
        setFollowing(following);
        setFollowers(followers);
    }, [following, followers]);

    const handleFollowersClick = (e: any) => {
        setFollowingDiv(false);
        setFollowersDiv(!followersDiv);
    };

    const handleFollowingClick = (e: any) => {
        setFollowersDiv(false);
        setFollowingDiv(!followingDiv);
    };

    const handleAddFriend = (e: any) => {
        e.preventDefault();
        post(route('friends.store'));
    };

    const handleRemove = (e: any) => {
        e.preventDefault();
        if (confirm('Are you sure you want to remove this friend?')) {
            destroy(route('friends.destroy', status.id));
        }
    };

    return (
        <YapLayout title={`${user.name}'s Profile`} notifs={haveNotifs} auth={auth}>
            <div className="flex w-full justify-center pb-4">
                <div className={`${followersDiv || followingDiv ? 'rounded-t-lg' : 'rounded-lg'} relative flex h-40 w-11/12 bg-white/20`}>
                    <div className={`${followersDiv ? '' : 'hidden'} absolute top-full h-60 w-full overflow-auto rounded-b-lg bg-white/20`}>
                        {follower &&
                            follower.length > 0 &&
                            follower.map((f: any, ind: any) => (
                                <div key={ind} className="mx-auto mb-3 flex h-16 w-11/12 items-center justify-between rounded-lg bg-white/10 text-sm">
                                    <h1 className="ms-2 font-bold">{f.notifs.name}</h1>
                                </div>
                            ))}
                    </div>
                    <div className={`${followingDiv ? '' : 'hidden'} absolute top-full h-60 w-full overflow-auto rounded-b-lg bg-white/20`}>
                        {followings &&
                            followings.length > 0 &&
                            followings.map((f: any, ind: any) => (
                                <div key={ind} className="mx-auto mb-3 flex h-16 w-11/12 items-center justify-between rounded-lg bg-white/10 text-sm">
                                    <h1 className="ms-2 font-bold">{f.users.name}</h1>
                                </div>
                            ))}
                    </div>
                    <div className="flex h-full w-2/6 flex-col items-center justify-center gap-2">
                        <button onClick={(e) => setCamera((p: any) => !p)}>
                            <img
                                src={`${window.location.origin}/storage/images/${user.profile}`}
                                alt="profile_pic"
                                className="h-16 w-16 rounded-full object-cover"
                            />
                        </button>
                        <h1 className="text-sm font-bold">{user.name}</h1>
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
                        <div className="flex h-1/2 w-full items-center justify-center gap-3">
                            {status != null ? (
                                status.status == 'accepted' ? (
                                    <form onSubmit={(e) => handleRemove(e)} className="flex h-full items-center justify-center text-sm">
                                        <button type="submit" className="rounded-lg bg-gray-400 px-8 py-1 text-sm">
                                            Remove
                                        </button>
                                    </form>
                                ) : (
                                    <form onSubmit={(e) => handleRemove(e)} className="flex h-full items-center justify-center text-sm">
                                        <button type="submit" className="rounded-lg bg-[coral] px-8 py-1 text-sm">
                                            Pending
                                        </button>
                                    </form>
                                )
                            ) : (
                                <form onSubmit={(e) => handleAddFriend(e)} className="flex h-full items-center justify-center text-sm">
                                    <button
                                        onClick={(e) => setData('id', user.id)}
                                        type="submit"
                                        className="rounded-lg bg-blue-500 px-8 py-1 text-sm"
                                    >
                                        Add Friend
                                    </button>
                                </form>
                            )}

                            <Link href={route('yaps.show', user.id)} className="rounded-lg bg-[#11998e] px-3 py-1 text-sm font-bold text-white">
                                Yap
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div
                onClick={(e) => setCamera((p: any) => !p)}
                className={`${camera ? 'fixed' : 'hidden'} top-0 flex h-screen w-screen items-center justify-center bg-black/40`}
            >
                {camera && (
                    <img
                        src={`${window.location.origin}/storage/images/${user.profile}`}
                        alt="profile_pic"
                        className="h-80 w-80 rounded-full object-cover"
                    />
                )}
            </div>
        </YapLayout>
    );
}

export default other_profile;
