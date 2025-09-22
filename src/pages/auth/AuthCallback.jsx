// AuthCallback.jsx
import React, { useEffect } from 'react';
import axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import { API_URL } from '../../config';

export default function AuthCallback() {
    const { setLogin, setUser, setLoginModal } = useAuthStore();

    useEffect(() => {
        (async () => {
            try {
                const sp = new URLSearchParams(window.location.search);
                const code = sp.get('code');
                const err = sp.get('error');
                if (err) throw new Error(err);
                if (!code) throw new Error('코드가 없습니다.');

                // PKCE: 인가 전에 저장한 verifier 꺼내기
                const code_verifier = localStorage.getItem('pkce_verifier') || undefined;

                // 서버로 교환 요청
                const body = { code, code_verifier };

                console.log(`${API_URL}/sns/google`);
                const res = await axios.post(`${API_URL}/sns/google`, body, {
                    headers: { 'Content-Type': 'application/json' },
                });

                let { user, isLinked, snsEmail, picture } = res.data;

                user = { ...user, profileImage: picture };
                if (isLinked && user) {
                    // 부모에게 로그인 성공 전파
                    if (window.opener) {
                        window.opener.postMessage(
                            { type: 'LOGIN_SUCCESS', payload: { user } },
                            window.location.origin
                        );
                    }
                } else {
                    // 회원가입 오픈
                    if (window.opener) {
                        window.opener.postMessage({ type: 'OPEN_JOIN' }, window.location.origin);
                    }
                }

                // 재요청 방지: URL의 ?code 제거
                window.history.replaceState({}, document.title, window.location.pathname);
                // PKCE 정리
                localStorage.removeItem('pkce_verifier');

                // 창 닫기
                window.close();
            } catch (e) {
                console.error('AuthCallback error:', e);
                sessionStorage.removeItem('pkce_verifier');
                // 필요하면 부모창 알림/에러 표시 넣기
                // if (window.opener) window.opener.postMessage({ type: "GOOGLE_AUTH_ERROR" }, window.location.origin);
                // setTimeout(() => window.close(), 1000);
            }
        })();
    }, []);

    return <div />;
}
