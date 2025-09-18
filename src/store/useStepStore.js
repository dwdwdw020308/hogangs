import { create } from "zustand";


const useStepStore = create((set, get) => ({

    steps: [
        { id: 1, process: 'ing' },
        { id: 2, process: 'none' },
        { id: 3, process: 'none' },
        { id: 4, process: 'none' },
        { id: 5, process: 'none' },
    ],

    setStepProcess: (id, process) => {
        set((state) => {
            steps: state.steps.map(s => s.id === id ? { ...s, process } : s)
        })

    },

}));

export default useStepStore;