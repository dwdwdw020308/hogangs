import { create } from 'zustand';
const initialSteps = [
    { id: 1, process: 'ing' },
    { id: 2, process: 'none' },
    { id: 3, process: 'none' },
    { id: 4, process: 'none' },
    { id: 5, process: 'none' },
];
const initialPaySteps = [
    { id: 'user', process: false },
    { id: 'terms', process: false },
    { id: 'cancel', process: false },
    { id: 'payment', process: false },
];

const ALERT_BY_ID = {
    user: '회원 정보를 모두 입력해 주세요.',
    terms: '모든 약관에 동의해 주세요.',
    cancel: '취소/환불 규정에 동의해 주세요.',
    payment: '결제 수단을 선택해 주세요.',
};

const ORDER = ['user', 'terms', 'cancel', 'payment'];

const useReservationStore = create((set, get) => ({
    steps: initialSteps,
    isNormalLogic: false,
    paymentProcesses: initialPaySteps,
    form: {},

    setStepProcesses: (updates) =>
        set((state) => {
            return {
                steps: state.steps.map((s) =>
                    updates[s.id] ? { ...s, process: updates[s.id] } : s
                ),
            };
        }),
    setPaymentProcesses: (id, value) =>
        set((state) => ({
            paymentProcesses: state.paymentProcesses.map((p) =>
                p.id === id ? { ...p, process: Boolean(value) } : p
            ),
        })),
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

    //예약중
    setBeingReservation: () => {
        set({ isNormalLogic: true });
    },

    paymentProcessValidate: () => {
        const { paymentProcesses } = get();
        // id → boolean 맵
        const status = Object.fromEntries(paymentProcesses.map((p) => [p.id, Boolean(p.process)]));

        // 정해둔 순서대로 첫 실패 찾기
        for (const id of ORDER) {
            if (!status[id]) {
                return { ok: false, id, message: ALERT_BY_ID[id] || '필수 항목을 완료해 주세요.' };
            }
        }
        return { ok: true };
    },
}));

export default useReservationStore;
