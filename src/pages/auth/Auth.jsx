import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_URL, KAKAO_REDIRECT_URI } from '../../config';
import axios from 'axios';
import { constructFromSymbol } from 'date-fns/constants';

const Auth = () => {
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
                console.log(`어디서 : ${code}`);
                const response = await fetch('https://kauth.kakao.com/oauth/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: import.meta.env.VITE_KAKAO_REST_API_KEY,
                        redirect_uri: KAKAO_REDIRECT_URI,
                        code,
                    }),
                });
                console.log(`오류가 : ${response}`);

                const data = await response.json();
                const { access_token } = data;
                console.log(`나는거냐 : ${access_token}`);
                if (access_token != '') {
                    const userInfo = await getKakaoUserInfo(access_token);
                    const params = { type: 'kakao', email: userInfo.email };
                    const res = await axios.post(
                        `${API_URL.replace(/\/$/, '')}/sns/kakao`,
                        params,
                        {
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );

                    let { user, isLinked } = res.data;

                    if (isLinked && user) {
                        user = {
                            ...user,
                            profile: userInfo.profileImage,
                            nickname: userInfo.nickname,
                        };
                        if (window.opener) {
                            window.opener.postMessage(
                                { type: 'LOGIN_SUCCESS', payload: { user } },
                                window.location.origin
                            );
                        }
                    } else {
                        // 회원가입 오픈
                        if (window.opener) {
                            window.opener.postMessage(
                                { type: 'OPEN_JOIN' },
                                window.location.origin
                            );
                        }
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

export default Auth;
