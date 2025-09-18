import { Outlet, useNavigate } from 'react-router-dom';
import Header from './header/Header';
import Footer from './footer/Footer';
import ChannelTalk from '../components/main/ChannelTalk';
import { useState } from 'react';

const Layout = () => {
    const navigate = useNavigate();
    const [hover, setHover] = useState(false); // hover 여부 state

    const handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); // 맨 위로 부드럽게 이동
    };

    return (
        <div className="wrap">
            <Header />
            <main className="main">
                <ChannelTalk />
                <div className="footer-buttons" aria-label="quick buttons">
                    {/* 버튼1: 클릭하면 /about 이동 */}
                    <img
                        src="/footer/button1.png"
                        alt="버튼1"
                        onClick={() => navigate('/Reservation')}
                        style={{ cursor: 'pointer' }}
                    />
                    <img
                        src={hover ? '/footer/button2-hover.png' : '/footer/button2.png'}
                        alt="버튼2"
                        onMouseEnter={() => setHover(true)}
                        onMouseLeave={() => setHover(false)}
                        onClick={handleScrollTop}
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
