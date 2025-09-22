// src/store/useAdminVideosStore.js
import { create } from 'zustand';
import axios from 'axios';
import { API_URL } from '../config';

const initialForm = {
    koTitle: '',
    enTitle: '',
    year: '',
    limit: 'ALL', // 관람 제한
    category: '', // 카테고리
    runtime: '', // 분
    youtubeId: '',
    desc: '',
};

const useAdminVideosStore = create((set, get) => ({
    // 목록 상태
    items: [],
    status: 'idle', // idle | loading | success | error
    error: null,
    lastFetched: 0,

    // 검색/정렬 상태
    query: '',
    sortBy: 'createdAt',
    sortDir: 'desc',

    // 폼 상태(입력값 + 파일)
    form: { ...initialForm },
    files: { visual: null, thumb: null },

    // ---------- 목록 ----------
    async fetchAll(force = false) {
        const fresh = Date.now() - get().lastFetched < 60_000;
        if (!force && fresh && get().items.length) return;

        set({ status: 'loading', error: null });
        try {
            const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/video`, {
                withCredentials: true,
            });
            const items = Array.isArray(data) ? data : data.items || [];
            set({ items, status: 'success', lastFetched: Date.now() });
        } catch (e) {
            set({
                status: 'error',
                error: e?.response?.data?.message || e.message || 'load failed',
            });
        }
    },

    setQuery(q) {
        set({ query: q });
    },

    toggleSort(by) {
        const { sortBy, sortDir } = get();
        if (sortBy === by) {
            set({ sortDir: sortDir === 'asc' ? 'desc' : 'asc' });
        } else {
            set({ sortBy: by, sortDir: 'asc' });
        }
    },

    async remove(id) {
        await axios.delete(`${API_URL.replace(/\/+$/, '')}/video/${id}`, { withCredentials: true });
        set({ items: get().items.filter((x) => (x.id ?? x._id) !== id) });
    },

    // ---------- 폼 ----------
    // 새로 만들 때 초기화
    reset() {
        set({ form: { ...initialForm }, files: { visual: null, thumb: null } });
    },

    // 수정 열 때 기존 값 채워넣기
    fillFrom(row) {
        const f = {
            koTitle: row.koTitle ?? '',
            enTitle: row.enTitle ?? '',
            year: row.year ?? '',
            limit: row.limit ?? 'ALL',
            category: row.category ?? '',
            runtime: row.runtime ?? '',
            youtubeId: row.youtubeId ?? '',
            desc: row.desc ?? '',
        };
        set({ form: f, files: { visual: null, thumb: null } });
    },

    setFormField(name, value) {
        set((s) => ({ form: { ...s.form, [name]: value } }));
    },

    setFile(name, file) {
        set((s) => ({ files: { ...s.files, [name]: file } }));
    },

    // 생성
    async submitCreate() {
        const { form, files } = get();
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
        if (files.visual) fd.append('visual', files.visual);
        if (files.thumb) fd.append('thumb', files.thumb);

        const { data } = await axios.post(`${API_URL.replace(/\/+$/, '')}/video`, fd, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        const saved = data?.item || data;
        set({ items: [saved, ...get().items] });
        return saved;
    },

    // 수정
    async submitUpdate(id) {
        const { form, files } = get();
        const fd = new FormData();
        Object.entries(form).forEach(([k, v]) => fd.append(k, v ?? ''));
        if (files.visual) fd.append('visual', files.visual);
        if (files.thumb) fd.append('thumb', files.thumb);

        const { data } = await axios.put(`${API_URL.replace(/\/+$/, '')}/video/${id}`, fd, {
            withCredentials: true,
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        const saved = data?.item || data;
        set({
            items: get().items.map((x) =>
                (x.id ?? x._id) === (saved.id ?? saved._id) ? saved : x
            ),
        });
        return saved;
    },
}));

export default useAdminVideosStore;
