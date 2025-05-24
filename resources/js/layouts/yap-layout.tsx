import { Head, Link } from '@inertiajs/react';
import { CgProfile } from 'react-icons/cg';
import { LiaUserFriendsSolid } from 'react-icons/lia';
import { MdNotificationsNone } from 'react-icons/md';
import whitelogo from '../../assets/images/yapster_white_logo.png';
import '../../assets/style/style.css';

function YapLayout({ children, title }: any) {
    return (
        <div className="roboto_ min-h-screen min-w-full bg-gradient-to-br from-[#2EE59D] to-[#11998e] md:flex">
            {/* Pc fix this shittt.... */}
            <div className="hidden h-screen w-1/8 flex-col items-center justify-around bg-[#11998e] md:flex">
                {/* <Link href={route('dashboard')} className="flex flex-col items-center justify-center gap-3 lg:flex-row">
                    <MdOutlineDashboard className="text-3xl" />
                    <p className="text-sm">Dashboard</p>
                </Link> */}
                <Link className="flex flex-col items-center justify-center gap-3 lg:flex-row" href={route('friends.index')}>
                    <LiaUserFriendsSolid className="text-3xl" />
                    <p className="m-0 text-center text-sm">Friends</p>
                </Link>
                <Link href={route('yaps.index')} className="flex flex-col items-center justify-center gap-3 lg:flex-row">
                    <img src={whitelogo} className="w-7" />
                    <p className="text-sm">Yaps</p>
                </Link>
                <Link className="flex flex-col items-center justify-center gap-3 lg:flex-row" href={route('my_profile')}>
                    <CgProfile className="text-3xl" />
                    <p className="m-0 text-center text-sm">Profile</p>
                </Link>
                <Link className="flex flex-col items-center justify-center gap-3 lg:flex-row" href={route('my_profile')}>
                    <MdNotificationsNone className="text-3xl" />
                    <p className="m-0 text-center text-sm">Notifications</p>
                </Link>
            </div>
            <div className="hidden h-screen w-7/8 overflow-auto md:block">
                <div className="flex w-full justify-center pt-4 pb-2">
                    <div className="montserrat_ w-11/12 text-3xl">{title}</div>
                </div>

                {children}
            </div>

            {/* PHONE */}

            {/* Title */}
            <div className="flex w-full justify-center pt-4 pb-2 md:hidden">
                <div className="montserrat_ w-11/12 text-3xl">{title}</div>
            </div>
            <Head title={title} />
            <div className="md:hidden">{children}</div>
            {/* Phone-Sidebar */}
            <div className="fixed bottom-0 flex h-1/12 w-full items-center justify-center bg-[#11998e] md:hidden">
                {/* <Link href={route('dashboard')} className="flex w-1/5 flex-col items-center">
                    <MdOutlineDashboard className="text-3xl" />
                    <p className="text-xs">Dashboard</p>
                </Link> */}
                <Link className="relative flex w-1/4 flex-col items-center" href={route('notifs')}>
                    <MdNotificationsNone className="relative text-3xl" />
                    <span className="absolute top-0 left-[52%] rounded-full bg-red-500 p-[5px]"></span>
                    <p className="m-0 text-center text-xs">Notifications</p>
                </Link>
                <Link className="flex w-1/4 flex-col items-center" href={route('friends.index')}>
                    <LiaUserFriendsSolid className="text-3xl" />
                    <p className="m-0 text-center text-xs">Friends</p>
                </Link>
                <Link href={route('yaps.index')} className="flex w-1/5 flex-col items-center">
                    <img src={whitelogo} className="w-7" />
                    <p className="text-xs">Yaps</p>
                </Link>
                <Link className="flex w-1/4 flex-col items-center" href={route('my_profile')}>
                    <CgProfile className="text-3xl" />
                    <p className="m-0 text-center text-xs">Profile</p>
                </Link>
            </div>
        </div>
    );
}

export default YapLayout;
