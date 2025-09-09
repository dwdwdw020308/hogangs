import { useEffect, useState } from 'react';
import BubbleLanding from '../../components/main/BubbleLanding';
import ChannelTalk from '../../components/main/ChannelTalk';
import Visual from '../../components/main/Visual';
import { getCookie, setCookie } from '../../utils/Cookie';
import Section1 from '../../components/main/sections/Section1';
import Section2 from '../../components/main/sections/Section2';
import BgFixed from '../../components/main/BgFixed';

const Main = () => {
    const [landingOn, setLandingOn] = useState(false); // 기본값 false → 쿠키 체크 후 결정

    useEffect(() => {
        // 쿠키 확인
        const hidden = getCookie('landing');

        if (!hidden) {
            // 쿠키가 없으면 랜딩 페이지 보여주기
            setLandingOn(true);
        }
    }, []);

    useEffect(() => {
        // body 스크롤 잠금 처리
        if (landingOn) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }
    }, [landingOn]);

    useEffect(() => {
        // ChannelTalk 동작 제어
        if (typeof window.ChannelIO !== 'function') return;

        if (landingOn) {
            window.ChannelIO('hideMessenger');
            window.ChannelIO('hideChannelButton');
        } else {
            window.ChannelIO('showChannelButton');
        }
    }, [landingOn]);

    // 랜딩 닫을 때 쿠키 저장 (하루 유지)
    const handleCloseLanding = () => {
        setCookie('landing', '1', 1); // 하루(1일) 동안 유지
        setLandingOn(false);
    };

    return (
        <>
            <div style={{ pointerEvents: landingOn ? 'none' : 'auto' }}>
                <Visual aria-hidden={landingOn} />

                <Section1 />
            </div>
            {landingOn && <BubbleLanding onClose={handleCloseLanding} />}
            <ChannelTalk />
        </>
    );
};

export default Main;
