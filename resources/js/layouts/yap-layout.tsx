import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { Link, router } from '@inertiajs/react';
import { LayoutGrid, LogOut } from 'lucide-react';
import default_profile from '../../assets/images/default.avif';
import whitelogo from '../../assets/images/yapster_white_logo.png';

function YapLayout({ children }: any) {
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <div className="min-h-screen min-w-full bg-gradient-to-br from-[#2EE59D] to-[#11998e]">
            {children}
            <div className="fixed bottom-0 flex h-1/12 w-full items-center justify-center bg-[#11998e] md:h-screen md:w-1/6 md:flex-col md:justify-around">
                <Link href={route('dashboard')} className="flex w-1/4 flex-col items-center">
                    <LayoutGrid />
                    <p className="text-xs">Dashboard</p>
                </Link>
                <Link href={route('yaps.index')} className="flex w-1/4 flex-col items-center">
                    <img src={whitelogo} className="w-7" />
                    <p className="text-xs">Yaps</p>
                </Link>
                <Link className="flex w-1/4 flex-col items-center" href={route('profile.edit')}>
                    <img src={default_profile} className="w-7 rounded-full" />
                    <p className="m-0 text-center text-xs">Profile</p>
                </Link>
                <Link className="flex w-1/4 flex-col items-center" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut />
                    <p className="text-xs">Log out</p>
                </Link>
            </div>
        </div>
    );
}

export default YapLayout;
