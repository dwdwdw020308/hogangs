import { create } from 'zustand';

const useCommonStore = create((set, get) => ({
    activeMenu: '',
    isMain: true,

    setIsMain: (path) => {
        if (path === '/' || path === '') {
            set({ isMain: true })
        } else {
            set({ isMain: false })
        }
    },

    setActiveMenu: (menu) => {
        set({ activeMenu: menu });
    },
}));

export default useCommonStore;
