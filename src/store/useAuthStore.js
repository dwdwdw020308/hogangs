import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
    step: 1,
    setStep: (value) => set({ step: value }),
    nextStep: () => set((state) => ({ step: state.step + 1 })),
    prevStep: () => set((state) => ({ step: Math.max(1, state.step - 1) })),

    loginModal: false,
    joinModal: false,

    setLoginModal: (value) => {
        set({ loginModal: value });
    },

    setJoinModal: (value) => {
        set({ joinModal: value });
    },

    closeLoginModal: () => set({ loginModal: false }),
    closeJoinModal: () => set({ joinModal: false }),
}));

export default useAuthStore;
