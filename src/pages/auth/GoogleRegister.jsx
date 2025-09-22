import axios from 'axios';
import { useEffect } from 'react';
import { API_URL } from '../../config';

const GoogleRegister = () => {
    useEffect(() => {
        (async () => {
            try {
                console.log(1);
                const sp = new URLSearchParams(window.location.search);
                const code = sp.get('code');
                const err = sp.get('error');
                if (err) throw new Error(err);
                if (!code) throw new Error('코드가 없습니다.');

                // PKCE: 인가 전에 저장한 verifier 꺼내기
                const code_verifier = localStorage.getItem('pkce_verifier') || undefined;

                const user = JSON.parse(localStorage.getItem('user'));

                const userId = user._id;

                // 서버로 교환 요청
                const body = { code, code_verifier, userId };

                const res = await axios.post(
                    `${API_URL.replace(/\/+$/, '')}/sns/googleRegister`,
                    body,
                    {
                        headers: { 'Content-Type': 'application/json' },
                        // withCredentials: true, // 쿠키 필요 시 주석 해제
                    }
                );

                let { error, message } = res.data;
                if (error == 0) {
                    alert('정상 처리 되었습니다.');
                    const msg = { type: 'REGISTER_SUCCESS' };

                    // 1) postMessage (부모창에 이벤트 전송)
                    try {
                        const parentOrigin = new URL(document.referrer || window.location.origin)
                            .origin;
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
                } else {
                    alert(message);
                }

                // 4) 마무리
                window.history.replaceState({}, document.title, window.location.pathname);
                localStorage.removeItem('pkce_verifier');
                window.close();
            } catch (e) {
                console.error('googleRegister error:', e);
            }
        })();
    }, []);
    return <div></div>;
};

export default GoogleRegister;
