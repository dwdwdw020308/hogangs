import { useLocation } from 'react-router-dom';
import { API_URL, KAKAO_REGISTER_REDIRECT_URI } from '../../config';
import axios from 'axios';
import { useEffect } from 'react';

const KakaoRegister = () => {
    const location = useLocation();
    const code = new URLSearchParams(location.search).get('code');

    useEffect(() => {
        const getKakaoUserInfo = async (accessToken) => {
            try {
                const response = await fetch('https://kapi.kakao.com/v2/user/me', {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${accessToken}`, // 필수
                        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
                    },
                });

                const data = await response.json();
                // console.log('카카오 사용자 정보:', data);

                // 필요한 값 추출
                const kakaoAccount = data.kakao_account || {};
                const profile = kakaoAccount.profile || {};

                const userInfo = {
                    id: data.id,
                    email: kakaoAccount.email,
                    nickname: profile.nickname,
                    profileImage: profile.profile_image_url,
                };

                return userInfo;
            } catch (error) {
                console.error('카카오 사용자 정보 요청 실패:', error);
                return null;
            }
        };

        const getKakaoToken = async (code) => {
            try {
                const response = await fetch('https://kauth.kakao.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                        redirect_uri: KAKAO_REGISTER_REDIRECT_URI,
                        code,
                    }),
                });

                const data = await response.json();
                const { access_token } = data;
                if (access_token != '') {
                    const userInfo = await getKakaoUserInfo(access_token);
                    const localUser = JSON.parse(localStorage.getItem('user'));

                    const params = { email: userInfo.email, userId: localUser._id };
                    const res = await axios.post(
                        `${API_URL.replace(/\/$/, '')}/sns/kakaoRegister`,
                        params,
                        {
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );
                    const { error, message } = res.data;
                    if (error === 0) {
                        alert(message);
                        const msg = { type: 'REGISTER_SUCCESS' };

                        // 1) postMessage (부모창에 이벤트 전송)
                        try {
                            const parentOrigin = new URL(
                                document.referrer || window.location.origin
                            ).origin;
                            window.opener?.postMessage(msg, parentOrigin);
                        } catch {}

                        try {
                            if (typeof BroadcastChannel !== 'undefined') {
                                const bc = new BroadcastChannel('auth');
                                bc.postMessage(msg);
                                bc.close();
                            }
                        } catch {}
                        try {
                            window.opener?.location?.reload();
                        } catch {}
                    }
                    window.history.replaceState({}, document.title, window.location.pathname);
                    window.close();
                }
            } catch (error) {
                console.error('토큰 요청 실패:', error);
            }
        };

        if (code) {
            getKakaoToken(code);
        }
    }, [code]);
    return <div></div>;
};

export default KakaoRegister;
