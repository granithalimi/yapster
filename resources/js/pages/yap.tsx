import YapLayout from '@/layouts/yap-layout';
import { useEffect, useState } from 'react';

function yap({ user, yaps }: any) {
    console.log(yaps);
    const [yap, setYaps] = useState<any>({});
    useEffect(() => {
        setYaps(yaps);
    }, [yaps]);

    return (
        <YapLayout title={`Chatting with ${user.name}`}>
            {yap && yap.length > 0 && yap.map((y: any, ind: any) => <div key={ind}>{y.message}</div>)}
        </YapLayout>
    );
}

export default yap;
