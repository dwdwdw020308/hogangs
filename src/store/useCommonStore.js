import { create } from 'zustand';

const useCommonStore = create((set, get) => ({
    activeMenu: '',

    setActiveMenu: (menu) => {
        set({ activeMenu: menu });
    },
}));

export default useCommonStore;
