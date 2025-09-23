import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '../config';

// 안전한 JSON 로딩 유틸
const load = (key, fallback) => {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
};

const useMypageStore = create((set, get) => ({
    user: load('user', null),
    snsLinks: [],
    reservations: [],
    userCoupons: [],
    // =================== 초기화 ========================
    fetchSns: async (userId) => {
        try {
            // 서버에서 GET /sns/user/:userId → [{provider:'kakao', linkedAt:...}, ...] 가정
            const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/sns/user/${userId}`);
            set({ snsLinks: Array.isArray(data) ? data : [], snsStatus: 'success' });
        } catch {
            // SNS가 없을 수도 있으니 조용히 빈배열
            set({ snsLinks: [], snsStatus: 'success' });
        }
    },
    fetchReservations: async (userId) => {
        try {
            const { data } = await axios.get(
                `${API_URL.replace(/\/+$/, '')}/reservation/user/${userId}`
            );
            set({ reservations: Array.isArray(data) ? data : [] });
        } catch (e) {}
    },

    fetchUserCoupons: async (userId) => {
        try {
            const { data } = await axios.get(
                `${API_URL.replace(/\/+$/, '')}/user-coupons/user/${userId}`
            );
            set({ userCoupons: Array.isArray(data) ? data : [] });
        } catch (e) {}
    },
    fetchAllForUser: async () => {
        const { user, fetchSns, fetchReservations, fetchUserCoupons } = get();
        const userId = user._id;

        await Promise.allSettled([
            fetchSns(userId),
            fetchReservations(userId),
            fetchUserCoupons(userId),
        ]);
    },
}));

export default useMypageStore;
