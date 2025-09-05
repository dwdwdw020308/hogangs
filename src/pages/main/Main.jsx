import { useEffect, useState } from 'react';
import Visual from '../../components/main/Visual';

import BubbleLanding from '../../components/main/BubbleLanding';

const Main = () => {
    const [landingOn, setLandingOn] = useState(true);
    // 랜딩 중 스크롤 잠금
    useEffect(() => {
        document.body.classList.toggle('no-scroll', landingOn);
        return () => document.body.classList.remove('no-scroll');
    }, [landingOn]);
    return (
        <>
            <div style={{ pointerEvents: landingOn ? 'none' : 'auto' }}>
                <Visual aria-hidden={landingOn} />
            </div>
            {landingOn && <BubbleLanding onClose={() => setLandingOn(false)} />}
        </>
    );
};

export default Main;
