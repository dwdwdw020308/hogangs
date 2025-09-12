import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';
import axios from 'axios';
import { useState } from 'react';
import { hashPassword } from '../../utils/Crypto';

const Login = () => {
    const setLoginModal = useAuthStore((state) => state.setLoginModal);
    const setJoinModal = useAuthStore((state) => state.setJoinModal);
    const setLogin = useAuthStore((state) => state.setLogin);
    const setUser = useAuthStore((state) => state.setUser);
    const apiUrl = import.meta.env.VITE_API_URL;
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const socialLogin = (sns) => {
        switch (sns) {
            case 'google':
                const GOOGLE_LOGIN_URL = import.meta.env.VITE_GOOGLE_LOGIN_URL;
                const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
                const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

                const url =
                    `${GOOGLE_LOGIN_URL}?` +
                    `client_id=${GOOGLE_CLIENT_ID}` +
                    `&redirect_uri=${GOOGLE_REDIRECT_URI}` +
                    `&response_type=code` +
                    `&scope=email profile openid`;

                window.open(url, '_blank', 'width=500,height=600');
                break;
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await axios.post(apiUrl + '/login', {
            email,
            password: hashPassword(password),
        });

        if (res.data.error === 0) {
            setLogin(true);
            setUser(res.data.user);
            navigate('/');
            setLoginModal(false);
        } else {
            alert('이메일 또는 비밀번호가 일치하지 않습니다.');
        }
    };

    return (
        <div className="login-overlay">
            <div className="login-modal">
                <div className="left">
                    <img src="/auth/loginBg.png" alt="" />
                </div>
                <div className="right">
                    <i className="close-btn" onClick={() => setLoginModal(false)}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                        >
                            <path
                                d="M2.29214 19.1407L0.355469 17.2604L8.10214 9.7393L0.355469 2.21817L2.29214 0.337891L10.0388 7.85902L17.7855 0.337891L19.7221 2.21817L11.9755 9.7393L19.7221 17.2604L17.7855 19.1407L10.0388 11.6196L2.29214 19.1407Z"
                                fill="#454545"
                            />
                        </svg>
                    </i>
                    <div className="login-inner">
                        <div className="top">
                            <h2>로그인</h2>
                            <form>
                                <input
                                    type="text"
                                    value={email}
                                    name=""
                                    id=""
                                    placeholder="이메일"
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                    }}
                                    autoFocus
                                />
                                <input
                                    type="password"
                                    value={password}
                                    name=""
                                    id=""
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="비밀번호"
                                />
                            </form>
                        </div>
                        <div className="bottom">
                            <div className="btnWrap">
                                <button type="submit" onClick={handleLogin}>
                                    로그인
                                </button>
                                <span className="join-btn" onClick={() => setJoinModal(true)}>
                                    회원가입
                                </span>
                            </div>
                            <div className="snsBox">
                                <div className="text">SNS 간편로그인</div>
                                <div className="snsWrap">
                                    <img
                                        onClick={() => {
                                            socialLogin('google');
                                        }}
                                        src="/auth/google.png"
                                        alt=""
                                    />

                                    <img src="/auth/kakao.png" alt="" />
                                    <img src="/auth/naver.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
