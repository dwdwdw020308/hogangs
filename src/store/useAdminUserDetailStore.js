import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

const err = (e) => e?.response?.data?.message || e.message || '요청 실패';

const useAdminUserDetailStore = create((set, get) => ({
    // states
    user: null,
    userStatus: 'idle',
    userError: '',

    snsLinks: [],
    snsStatus: 'idle',

    reservations: [],
    resvStatus: 'idle',

    userCoupons: [],
    couponStatus: 'idle',

    modalOpen: false,
    setModalOpen: (v) => set({ modalOpen: v }),

    // actions
    fetchUser: async (id) => {
        set({ userStatus: 'loading', userError: '' });
        try {
            const { data } = await axios.get(`${API_URL}/user/${id}`);
            set({ user: data, userStatus: 'success' });
        } catch (e) {
            set({ userStatus: 'error', userError: err(e) });
        }
    },

    fetchSns: async (userId) => {
        set({ snsStatus: 'loading' });
        try {
            // 서버에서 GET /sns/user/:userId → [{provider:'kakao', linkedAt:...}, ...] 가정
            const { data } = await axios.get(`${API_URL}/sns/user/${userId}`);
            set({ snsLinks: Array.isArray(data) ? data : [], snsStatus: 'success' });
        } catch {
            // SNS가 없을 수도 있으니 조용히 빈배열
            set({ snsLinks: [], snsStatus: 'success' });
        }
    },

    fetchReservations: async (userId) => {
        set({ resvStatus: 'loading' });
        try {
            const { data } = await axios.get(`${API_URL}/reservation/user/${userId}`);
            set({ reservations: Array.isArray(data) ? data : [], resvStatus: 'success' });
        } catch (e) {
            set({ resvStatus: 'error' });
        }
    },

    fetchUserCoupons: async (userId) => {
        set({ couponStatus: 'loading' });
        try {
            const { data } = await axios.get(`${API_URL}/user-coupons/user/${userId}`);
            set({ userCoupons: Array.isArray(data) ? data : [], couponStatus: 'success' });
        } catch (e) {
            set({ couponStatus: 'error' });
        }
    },

    markCouponUsed: async (userCouponId) => {
        await axios.patch(`${API_URL}/user-coupons/${userCouponId}/use`);
        // 로컬 갱신
        set((state) => ({
            userCoupons: state.userCoupons.map((c) =>
                (c.id ?? c._id) === userCouponId
                    ? { ...c, status: 1, usedAt: new Date().toISOString() }
                    : c
            ),
        }));
    },

    fetchAllForUser: async (userId) => {
        const { fetchUser, fetchSns, fetchReservations, fetchUserCoupons } = get();
        await Promise.allSettled([
            fetchUser(userId),
            fetchSns(userId),
            fetchReservations(userId),
            fetchUserCoupons(userId),
        ]);
    },
}));

export default useAdminUserDetailStore;
