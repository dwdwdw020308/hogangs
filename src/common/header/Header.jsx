import { useEffect, useRef, useState } from 'react';
import Login from '../../components/auth/Login';
import { Link, useNavigate } from 'react-router-dom';
import Join from '../../components/auth/join';
import useAuthStore from '../../store/useAuthStore';
import NotLoginH from './NotLogin';
import LoginMenu from './LoginMenu';
import useCommonStore from '../../store/useCommonStore';

const Header = () => {
    const loginModal = useAuthStore((state) => state.loginModal);
    const joinModal = useAuthStore((state) => state.joinModal);

    // header menu active추가
    const activeMenu = useCommonStore((state) => state.activeMenu);

    const [hidden, setHidden] = useState(false); // header 숨김 상태
    const timeoutRef = useRef(null);

    const navigate = useNavigate();

    const { setLoginModal, setJoinModal } = useAuthStore();
    const { isLogin, setIsLogin } = useAuthStore();
    useEffect(() => {
        // 팝업이면(부모가 존재) 리스너 등록하지 않음
        if (window.opener) return;

        const bc = new BroadcastChannel('auth');
        const onMsg = (e) => {
            // 최상위 창(부모)에서만 처리
            if (window !== window.top) return;
            if (e?.data?.type === 'OPEN_JOIN') {
                setLoginModal(false);
                setJoinModal(true);
            }
        };

        bc.addEventListener('message', onMsg);

        // 추가: postMessage 경로도 지원(오리진 다를 때 대비)
        const onWinMsg = (e) => {
            if (e.origin !== window.location.origin) return;
            if (e?.data?.type === 'OPEN_JOIN') {
                setLoginModal(false);
                setJoinModal(true);
            }
        };
        window.addEventListener('message', onWinMsg);

        return () => {
            bc.removeEventListener('message', onMsg);
            bc.close();
            window.removeEventListener('message', onWinMsg);
        };
    }, [setJoinModal, setLoginModal]);

    useEffect(() => {
        let lastScrollY = window.scrollY;

        const handleScroll = () => {
            // 스크롤 중이면 바로 header 숨기기
            setHidden(true);

            // 기존 타이머 초기화 (계속 스크롤 중이면 delay 유지)
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }

            // 스크롤 멈춘 후 0.5초 뒤 다시 보여줌
            timeoutRef.current = setTimeout(() => {
                setHidden(false);
            }, 500); // 0.5초 delay
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <header
            id="header"
            style={{
                transition: 'opacity 0.3s ease', // 부드럽게 전환
                opacity: hidden ? 0 : 1,
            }}
        >
            <div className="inner">
                <h2
                    onClick={() => {
                        navigate('/');
                    }}
                    className="logo"
                ></h2>

                <nav>
                    <ul>
                        <li
                            onClick={() => {
                                navigate('/about');
                            }}
                            className={activeMenu === '/about' ? 'active' : ''}
                        >
                            AboutUs
                        </li>
                        <li
                            onClick={() => {
                                navigate('/ott');
                            }}
                            className={activeMenu === '/ott' ? 'active' : ''}
                        >
                            Video
                        </li>
                        <li
                            onClick={() => {
                                navigate('/hotel');
                            }}
                            className={activeMenu === '/hotel' ? 'active' : ''}
                        >
                            Hotel
                        </li>
                        <li>Grooming</li>
                    </ul>
                </nav>
                {isLogin ? <LoginMenu /> : <NotLoginH />}
            </div>
            {loginModal && (
                <Login
                    onJoin={() => {
                        setLoginModal(false);
                        setJoinModal(true);
                    }}
                />
            )}
            {joinModal && <Join />}
        </header>
    );
};

export default Header;
