import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import YapLayout from '@/layouts/yap-layout';
import { Link, router } from '@inertiajs/react';
import { LogOut } from 'lucide-react';
import { CgProfile } from 'react-icons/cg';

function my_profile({ auth, following, followers }: any) {
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <YapLayout title={'My Profile'}>
            <div className="flex w-full justify-center pb-4">
                <div className="flex h-40 w-11/12 rounded-lg bg-white/20">
                    <div className="flex h-full w-2/6 flex-col items-center justify-center">
                        <CgProfile className="text-5xl" />
                        <h1 className="text-sm font-bold">{auth.user.name}</h1>
                    </div>
                    <div className="h-full w-4/6">
                        <div className="flex h-1/2 w-full items-end justify-center gap-5 text-sm">
                            <button className="flex flex-col items-center">
                                <p>Followers</p>
                                <p className="text-black">{followers}</p>
                            </button>
                            <button className="flex flex-col items-center">
                                <p>Following</p>
                                <p className="text-black">{following}</p>
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
        </YapLayout>
    );
}

export default my_profile;
