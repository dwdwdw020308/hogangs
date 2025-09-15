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

const useAuthStore = create((set, get) => ({
    // ----- 진행 단계 -----
    step: 1,
    setStep: (value) => set({ step: value }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

    // ----- 인증 상태 (localStorage 동기화) -----
    user: load('user', null),
    isLogin: load('isLogin', false),

    setUser: (user) => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
        } catch {}
        set({ user });
    },
    setLogin: (value) => {
        try {
            localStorage.setItem('isLogin', JSON.stringify(value));
        } catch {}
        set({ isLogin: value });
    },

    // 편의: 로그인 성공 한 번에 설정
    loginSuccess: (user) => {
        try {
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('isLogin', JSON.stringify(true));
        } catch {}
        set({ user, isLogin: true, loginModal: false, joinModal: false });
    },

    // 로그아웃
    logout: () => {
        try {
            localStorage.removeItem('user');
            localStorage.removeItem('isLogin');
        } catch {}
        set({ user: null, isLogin: false });
    },

    // ----- 모달 상태 -----
    loginModal: false,
    joinModal: false,

    setLoginModal: (value) => set({ loginModal: value }),
    setJoinModal: (value) => set({ joinModal: value }),
}));

export default useAuthStore;
