import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import YapLayout from '@/layouts/yap-layout';
import { router } from '@inertiajs/react';
import { FaSearch } from 'react-icons/fa';

function yaps({ auth }: any) {
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <YapLayout title="Yaps">
            <div className="flex w-full justify-center pb-4">
                <div className="relative w-11/12">
                    <input className="w-full rounded-xl bg-white/20 py-1 ps-7 text-black backdrop-blur-2xl" placeholder={`Search Yaps...`} />
                    <FaSearch className="absolute top-1/2 left-2 -translate-y-1/2 text-[#11998e]" />
                </div>
            </div>
            <div className="flex w-full justify-center">
                <div className="w-11/12 pb-20">
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                    <div className="my-3 h-20 w-full rounded-xl bg-white/20 backdrop-blur-3xl"></div>
                </div>
            </div>
        </YapLayout>
    );
}

export default yaps;
