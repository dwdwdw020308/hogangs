// src/store/useAdminUsersStore.js
import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';


export const useAdminUsersStore = create((set, get) => ({
  items: [],
  lastFetched: 0,
  status: 'idle', // 'idle' | 'loading' | 'success' | 'error'
  error: null,

  // UI 상태
  query: '',
  sortBy: 'createdAt',
  sortDir: 'desc', // 'asc' | 'desc'

  // 목록 가져오기 (1분 TTL 캐시)
  fetchAll: async (force = false) => {
    const fresh = Date.now() - get().lastFetched < 60_000;
    if (!force && fresh && get().items.length > 0) return;

    set({ status: 'loading', error: null });
    try {
      const { data } = await axios.get(`${API_URL}/user`, { withCredentials: true });
      console.log(data)
      const items = Array.isArray(data) ? data : (data?.items ?? []);
      set({ items, lastFetched: Date.now(), status: 'success' });
    } catch (e) {
      set({ status: 'error', error: e?.response?.data?.message || e.message || 'load failed' });
    }
  },

  setQuery: (q) => set({ query: q }),

  toggleSort: (by) => {
    const { sortBy, sortDir } = get();
    if (sortBy === by) {
      set({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' });
    } else {
      set({ sortBy: by, sortDir: 'asc' });
    }
  },

  // 추가/수정(낙관적 반영)
  upsert: (u) => {
    const items = get().items.slice();
    const idOf = (x) => x.id ?? x._id;
    const i = items.findIndex((x) => idOf(x) === idOf(u));
    if (i >= 0) items[i] = { ...items[i], ...u };
    else items.unshift(u);
    set({ items });
  },

  // 삭제
  remove: (id) => {
    set({ items: get().items.filter((x) => (x.id ?? x._id) !== id) });
  },

  // 초기화
  clear: () => set({ items: [], lastFetched: 0, status: 'idle', error: null }),
}));
