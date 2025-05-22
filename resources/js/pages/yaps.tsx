import { useMobileNavigation } from '@/hooks/use-mobile-navigation';
import YapLayout from '@/layouts/yap-layout';
import { router } from '@inertiajs/react';

function yaps({ auth }: any) {
    const cleanup = useMobileNavigation();
    const handleLogout = () => {
        cleanup();
        router.flushAll();
    };
    return (
        <YapLayout>
            <div>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="text-8xl">hello</h1>
                <h1 className="pb-20 text-8xl">hello</h1>
            </div>
        </YapLayout>
    );
}

export default yaps;
