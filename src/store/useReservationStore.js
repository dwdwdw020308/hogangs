import { create } from 'zustand';
const initialSteps = [
    { id: 1, process: 'ing' },
    { id: 2, process: 'none' },
    { id: 3, process: 'none' },
    { id: 4, process: 'none' },
    { id: 5, process: 'none' },
];
const useReservationStore = create((set, get) => ({
    steps: initialSteps,
    form: {},

    setStepProcesses: (updates) =>
        set((state) => {
            return {
                steps: state.steps.map((s) =>
                    updates[s.id] ? { ...s, process: updates[s.id] } : s
                ),
            };
        }),
    setFormField: (key, value) =>
        set((state) => {
            const form = { ...state.form, [key]: value };
            // ← 필드 바뀔 때마다 자동 저장하고 싶으면 아래 3줄 유지
            try {
                if (typeof window !== 'undefined') {
                    localStorage.setItem('reservationForm', JSON.stringify(form));
                }
            } catch (e) {
                console.error('localStorage save error:', e);
            }
            return { form };
        }),

    // 수동 저장이 필요할 때 호출
    setLocalStorageForm: () => {
        try {
            if (typeof window !== 'undefined') {
                const form = get().form;
                localStorage.setItem('reservationForm', JSON.stringify(form));
            }
        } catch (e) {
            console.error('localStorage save error:', e);
        }
    },
    // 앱 시작 시 불러오기용(옵션)
    loadLocalStorageForm: () => {
        try {
            if (typeof window !== 'undefined') {
                const raw = localStorage.getItem('reservationForm');
                if (raw) set({ form: JSON.parse(raw) });
            }
        } catch (e) {
            console.error('localStorage load error:', e);
        }
    },
}));

export default useReservationStore;
