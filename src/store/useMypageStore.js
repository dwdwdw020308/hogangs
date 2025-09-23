import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '../config';
// const API_URL = 'http://localhost:3000';
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
    // 반려견 정보 등록
    myPets: [],
    // =================== 초기화 ========================

    // 목록 조회
    fetchMyPets: async () => {
        const userId = get()?.user?._id;
        if (!userId) return;
        const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/pets`, {
            params: { userId },
        });
        set({ myPets: Array.isArray(data) ? data : [] });
    },

    // 추가
    createPet: async (pet) => {
        const userId = get()?.user?._id;
        if (!userId) throw new Error('로그인이 필요합니다.');
        const payload = { ...pet, userId };
        const { data } = await axios.post(`${API_URL.replace(/\/+$/, '')}/pets`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        // 단건 반환이면 목록에 푸시, 아니면 refetch
        if (data && data._id) {
            set((s) => ({ myPets: [data, ...s.myPets] }));
        } else {
            await get().fetchMyPets();
        }
    },

    // 수정
    updatePet: async (petId, patch) => {
        const { data } = await axios.patch(`${API_URL.replace(/\/+$/, '')}/pets/${petId}`, patch, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (data && data._id) {
            set((s) => ({
                myPets: s.myPets.map((p) => (p._id === data._id ? data : p)),
            }));
        } else {
            await get().fetchMyPets();
        }
    },

    // upsert: _id 있으면 수정, 없으면 생성
    upsertPet: async (pet) => {
        if (pet?._id) {
            const { _id, ...patch } = pet;
            await get().updatePet(_id, patch);
        } else {
            await get().createPet(pet);
        }
    },
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
