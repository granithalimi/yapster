import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { LayoutGrid, LogOut } from 'lucide-react';
import default_profile from '../../assets/images/default.avif';
import whitelogo from '../../assets/images/yapster_white_logo.png';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Yaps',
        href: '/yaps',
    },
];
function yaps({ auth }: any) {
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Dashboard" />
        // </AppLayout>
        <div className="h-screen w-full bg-gradient-to-br from-[#2EE59D] to-[#11998e]">
            <Head title="Yaps" />
            <div className="fixed bottom-0 flex h-1/12 w-full items-center justify-center bg-[#11998e] md:h-screen md:w-1/6 md:flex-col md:justify-around">
                <Link href={route('dashboard')} className="flex w-1/4 flex-col items-center">
                    <LayoutGrid />
                    <p className="text-sm">Dashboard</p>
                </Link>
                <Link href={route('yaps.index')} className="flex w-1/4 flex-col items-center">
                    <img src={whitelogo} className="w-7" />
                    <p className="text-sm">Yaps</p>
                </Link>
                <Link className="flex w-1/4 flex-col items-center" href={route('profile.edit')}>
                    <img src={default_profile} className="w-7 rounded-full" />
                    {auth.user.name}
                </Link>
                <Link className="flex w-1/4 flex-col items-center" method="post" href={route('logout')} as="button" onClick={handleLogout}>
                    <LogOut />
                    Log out
                </Link>
            </div>
        </div>
    );
}

export default yaps;
