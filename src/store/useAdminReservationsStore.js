import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

export const useAdminReservationsStore = create((set, get) => ({
    items: [],
    status: 'idle', // 'idle' | 'loading'
    error: '',
    resType: 'hotel', // 'hotel' | 'grooming'
    query: '',
    sortBy: 'createdAt',
    sortDir: 'desc', // 'asc' | 'desc'

    setResType: (t) => set({ resType: t }),
    setQuery: (q) => set({ query: q }),
    toggleSort: (key) =>
        set((s) => {
            const dir = s.sortBy === key ? (s.sortDir === 'asc' ? 'desc' : 'asc') : 'asc';
            return { sortBy: key, sortDir: dir };
        }),

    fetchAll: async (force = false) => {
        const { resType } = get();
        set({ status: 'loading', error: '' });
        try {
            // 기본: /reservations?type=hotel|grooming
            let url = `${API_URL.replace(/\/+$/, '')}/reservation`;
            const { data } = await axios.get(url, { params: { type: resType } });

            // 서버가 data 래핑 없이 배열을 주거나 {data:[]} 로 줄 수 있으니 모두 케이스 처리
            const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
            set({ items: arr, status: 'idle', error: '' });
        } catch (e1) {
            // 백엔드가 아직 /reservations 전체 리스트를 안 만들었으면 404가 떨어질 수 있음 → 임시 폴백
            try {
                const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/reservation`, {
                    params: {},
                });
                const arr = Array.isArray(data) ? data : Array.isArray(data?.data) ? data.data : [];
                // 클라에서 타입 필터링
                const filtered = arr.filter((v) => String(v?.resType).toLowerCase() === resType);
                set({ items: filtered, status: 'idle', error: '' });
            } catch (e2) {
                set({
                    status: 'idle',
                    error:
                        e2?.response?.data?.message || e2?.message || 'Failed to load reservations',
                });
            }
        }
    },
}));
