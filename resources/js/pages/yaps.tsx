import { type BreadcrumbItem } from '@/types';

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
        <div className="bg-[]">
            <div className="fixed bottom-0 h-1/12 w-full bg-red-400 md:h-screen md:w-1/6"></div>
        </div>
    );
}

export default yaps;
