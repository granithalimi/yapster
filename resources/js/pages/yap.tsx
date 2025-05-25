import YapLayout from '@/layouts/yap-layout';
import { useEffect, useState } from 'react';

function yap({ user, yaps }: any) {
    console.log(yaps);
    const [yap, setYaps] = useState<any>({});
    useEffect(() => {
        setYaps(yaps);
    }, [yaps]);
    // fix the bug where there is no convo nor yaps
    return (
        <YapLayout title={`Chatting with ${user.name}`}>
            {/* {yap.yaps && yap.yaps.length > 0 && yap.yaps.map((y: any, ind: any) => <div key={ind}>{y.message}</div>)} */}
            {yap && yap.length > 0 ? (
                yap[0].yaps.map((y, ind) => (
                    <div key={ind} className="flex gap-3">
                        <h1 className="font-extrabold">{y.sender_user.name}</h1>
                        <h1 className="">{y.message}</h1>
                    </div>
                ))
            ) : (
                <h1>start chatting nigger</h1>
            )}
        </YapLayout>
    );
}

export default yap;
