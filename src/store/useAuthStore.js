import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    loginModal: false,
    joinModal: false,

    setLoginModal: (value) => {
        set({ loginModal: value });
    },

    setJoinModal: (value) => {
        set({ joinModal: value });
    },
}));

export default useAuthStore;
