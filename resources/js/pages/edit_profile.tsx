import { Checkbox } from '@/components/ui/checkbox';
import YapLayout from '@/layouts/yap-layout';
import { useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import { LuCamera } from 'react-icons/lu';

function edit_profile({ auth, notifs }: any) {
    const [haveNotifs, setHaveNotifs] = useState<boolean>(false);

    useEffect(() => {
        if (notifs.length > 0) {
            setHaveNotifs((p) => true);
        } else {
            setHaveNotifs((p) => false);
        }
    }, [notifs]);

    const {
        data,
        setData,
        post,
        delete: destroy,
    } = useForm<any>({
        name: auth.user.name,
        phone: auth.user.phone,
        image: null,
        remove: false,
    });

    const handleSubmit = (e: any) => {
        e.preventDefault();
        post(route('my_profile.update'));
    };
    return (
        <YapLayout title={`Edit Profile ${auth.user.name}`} auth={auth} notifs={haveNotifs}>
            <div className="flex w-full justify-center pb-4">
                <form
                    encType="multipart/form-data"
                    className="mt-4 flex w-11/12 flex-col items-center gap-2 rounded-lg bg-white/10 p-5"
                    onSubmit={(e) => handleSubmit(e)}
                >
                    <label className={`labell relative flex h-20 w-20 items-center justify-center rounded-full bg-gray-400`} htmlFor="image">
                        <LuCamera className="absolute z-20 text-3xl text-white" />
                        <img
                            src={`${window.location.origin}/storage/images/${auth.user.profile}`}
                            className="h-full w-full rounded-full object-cover"
                        />
                        <div className="absolute top-0 h-full w-full rounded-full bg-black/30"></div>
                    </label>
                    <input
                        type="file"
                        accept="image/*"
                        capture="user"
                        onChange={(e: any) => setData('image', e.target.files[0])}
                        className="hidden"
                        id="image"
                        name="image"
                    />

                    <div className="flex flex-col">
                        <label>Name</label>
                        <input
                            onChange={(e) => setData('name', e.target.value)}
                            value={data.name}
                            type="text"
                            className="rounded-xl border-1 border-white p-1 ps-2"
                        />
                    </div>

                    <div className="flex flex-col">
                        <label>Phone Number</label>
                        <input
                            type="phone"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            className="rounded-xl border-1 border-white p-1 ps-2"
                        />
                    </div>
                    <div className="flex items-center gap-1">
                        <Checkbox id="remove" name="remove" checked={data.remove} onClick={() => setData('remove', !data.remove)} tabIndex={3} />
                        <label htmlFor="remove">Remove profile</label>
                    </div>
                    <button className="mt-4 rounded-lg bg-blue-500 px-3 py-1 text-sm font-bold text-white" type="submit">
                        Update
                    </button>
                </form>
            </div>
        </YapLayout>
    );
}

export default edit_profile;
