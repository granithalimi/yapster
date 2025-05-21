import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Yaps',
        href: '/yaps',
    },
];
function yaps() {
    return (
        // <AppLayout breadcrumbs={breadcrumbs}>
        //     <Head title="Dashboard" />
        // </AppLayout>
        <div className="bg-white">
            <Head title="Yaps" />
            <div className="fixed bottom-0 h-1/12 w-full bg-red-400 md:h-screen md:w-1/6">
                <Link href={route('dashboard')}>Dashboard</Link>
            </div>
        </div>
    );
}

export default yaps;
