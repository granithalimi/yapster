import YapLayout from '@/layouts/yap-layout';
import { useEffect, useState } from 'react';

function yap({ user, yaps }: any) {
    console.log(yaps);
    const [yap, setYaps] = useState<any>({});
    useEffect(() => {
        setYaps(yaps[0]);
    }, [yaps]);
    // fix the bug where there is no convo nor yaps
    return (
        <YapLayout title={`Chatting with ${user.name}`}>
            {yap.yaps && yap.yaps.length > 0 && yap.yaps.map((y: any, ind: any) => <div key={ind}>{y.message}</div>)}
        </YapLayout>
    );
}

export default yap;
