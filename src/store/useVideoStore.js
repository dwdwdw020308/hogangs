import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

const BASE = API_URL.replace(/\/+$/, '');

export const useVideoStore = create((set, get) => ({
    savingHistory: false,
    lastHistoryKey: null, // `${userId}:${videoId}`

    // 비디오 썸네일/재생 버튼 클릭 시 호출
    saveHistory: async (userId, videoId) => {
        if (!userId || !videoId) return;

        const key = `${userId}:${videoId}`;
        // 같은 항목을 연속 클릭할 때 과다 호출 방지
        if (get().savingHistory || get().lastHistoryKey === key) return;

        set({ savingHistory: true });
        try {
            await axios.post(
                `${BASE}/video-history`,
                { userId, videoId },
                { headers: { 'Content-Type': 'application/json' } }
            );
            set({ lastHistoryKey: key });
        } catch (err) {
            console.error('saveHistory error:', err?.response?.data || err);
        } finally {
            set({ savingHistory: false });
            // 잠깐 후 같은 항목 다시 저장 가능하도록 키 리셋
            setTimeout(() => {
                if (get().lastHistoryKey === key) set({ lastHistoryKey: null });
            }, 1500);
        }
    },
}));
