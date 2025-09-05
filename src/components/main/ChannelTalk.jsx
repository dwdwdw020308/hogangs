import { useEffect } from 'react';
import { loadScript, boot, shutdown } from '@channel.io/channel-web-sdk-loader';

export default function ChannelTalk() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        (async () => {
            try {
                if (typeof loadScript === 'function') {
                    await loadScript();
                }

                const key = import.meta.env.VITE_CHANNELTALK_PLUGIN_KEY;
                if (!key) {
                    console.warn('VITE_CHANNELTALK_PLUGIN_KEY 가 없습니다 (.env 확인)');
                    return;
                }
                boot({
                    pluginKey: key,
                    // hideChannelButtonOnBoot: true,
                });
            } catch (e) {
                console.error('ChannelTalk boot 실패:', e);
            }
        })();
        return () => {
            try {
                shutdown?.();
            } catch (_) {}
        };
    }, []);

    return null;
}
