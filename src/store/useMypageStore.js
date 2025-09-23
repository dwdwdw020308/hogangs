import { create } from 'zustand';

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
}));

export default useMypageStore;
