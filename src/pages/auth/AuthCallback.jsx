import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';

const AuthCallback = () => {
    const [status, setStatus] = useState('처리 중...');

    const apiUrl = import.meta.env.VITE_API_URL;
    useEffect(() => {
        (async () => {
            try {
                const params = new URLSearchParams(window.location.search);
                const code = params.get('code');
                const error = params.get('error');

                if (error) throw new Error(error);
                if (!code) throw new Error('코드가 없습니다.');

                const res = await axios.post(
                    `${apiUrl.replace(/\/$/, '')}/sns/google`,
                    { code },
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: false,
                    }
                );
                // res.userId 값이 없으면 회원가입로 전환

                const userId = res?.data?.userId ?? res?.data?.data?.userId;
                const isNewUser = !userId; // '', null, undefined, 0 모두 신규 취급 원치 않으면 조정

                if (isNewUser) {
                    // 1) 부모창에게만 postMessage
                    if (window.opener) {
                        window.opener.postMessage({ type: 'OPEN_JOIN' }, window.location.origin);
                    } else {
                        // 2) 혹시 모를 대비(같은 오리진 다탭): BroadcastChannel도 함께 송신
                        const bc = new BroadcastChannel('auth');
                        bc.postMessage({ type: 'OPEN_JOIN' });
                        bc.close();
                    }
                    // 레이스 방지(부모가 리스너 세팅/렌더 반영할 시간)
                    setTimeout(() => window.close(), 120);
                } else {
                    window.close();
                }
            } catch (e) {
                console.error(e);
                // if (window.opener) {
                //     window.opener.postMessage(
                //         { type: 'GOOGLE_AUTH_ERROR', error: String(e) },
                //         window.location.origin
                //     );
                // }
                // setStatus('로그인 실패');
                // setTimeout(() => window.close(), 1200);
            }
        })();
    }, []);
    return <div></div>;
};

export default AuthCallback;
