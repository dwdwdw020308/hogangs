import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

const getErr = (e) => e?.response?.data?.message || e.message || '요청 실패';
const pickList = (data) =>
    Array.isArray(data) ? data : Array.isArray(data?.items) ? data.items : [];

const idOf = (row) => row?.id ?? row?._id;

/**
 * item shape 예시:
 * {
 *   _id: string,          // or id
 *   name: string,         // 쿠폰명
 *   type: 'pass'|'discount', // 이용권/할인권
 *   validDays: number,    // 사용 가능일수
 *   createdAt?: string
 * }
 */
const useAdminCouponsStore = create((set, get) => ({
    // state
    items: [],
    status: 'idle', // 'idle' | 'loading' | 'error' | 'success'
    error: '',
    query: '',
    sortBy: 'createdAt',
    sortDir: 'desc', // 'asc' | 'desc'
    _loadedOnce: false,

    // actions
    setQuery: (q) => set({ query: q }),

    toggleSort: (key) =>
        set((state) => {
            const same = state.sortBy === key;
            return {
                sortBy: key,
                sortDir: same ? (state.sortDir === 'asc' ? 'desc' : 'asc') : 'asc',
            };
        }),

    fetchAll: async (force = false) => {
        const { _loadedOnce } = get();
        if (_loadedOnce && !force) return;

        set({ status: 'loading', error: '' });
        try {
            const res = await axios.get(`${API_URL}/coupon`, {
                headers: { 'Content-Type': 'application/json' },
            });
            const list = pickList(res.data);
            set({ items: list, status: 'success', _loadedOnce: true });
        } catch (e) {
            set({ status: 'error', error: getErr(e) });
        }
    },

    remove: async (id) => {
        if (!id) throw new Error('ID가 없습니다.');
        await axios.delete(`${API_URL}/coupon/${id}`, {
            headers: { 'Content-Type': 'application/json' },
        });
        // 로컬에서도 즉시 제거
        set((state) => ({
            items: state.items.filter((it) => idOf(it) !== id),
        }));
    },

    // (선택) 모달에서 성공 후 리스트 전체 리패치 대신 부분 업데이트 하고 싶을 때 사용
    upsertLocal: (row) =>
        set((state) => {
            const id = idOf(row);
            if (!id) return state;
            const idx = state.items.findIndex((it) => idOf(it) === id);
            if (idx === -1) {
                return { items: [row, ...state.items] };
            }
            const next = state.items.slice();
            next[idx] = { ...state.items[idx], ...row };
            return { items: next };
        }),
}));

export default useAdminCouponsStore;
