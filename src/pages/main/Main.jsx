import { useEffect, useState } from 'react';
import BubbleLanding from '../../components/main/BubbleLanding';

import ChannelTalk from '../../components/main/ChannelTalk';
import Visual from '../../components/main/Visual';

const Main = () => {
    const [landingOn, setLandingOn] = useState(true);
    useEffect(() => {
        document.body.classList.toggle('no-scroll', landingOn);
        return () => document.body.classList.remove('no-scroll');
    }, [landingOn]);
    useEffect(() => {
        if (typeof window.ChannelIO !== 'function') return;

        if (landingOn) {
            window.ChannelIO('hideMessenger');
            window.ChannelIO('hideChannelButton');
        } else {
            window.ChannelIO('showChannelButton');
        }
    }, [landingOn]);

    return (
        <>
            <div style={{ pointerEvents: landingOn ? 'none' : 'auto' }}>
                <Visual aria-hidden={landingOn} />
            </div>
            {landingOn && <BubbleLanding onClose={() => setLandingOn(false)} />}
            <ChannelTalk />
        </>
    );
};

export default Main;
