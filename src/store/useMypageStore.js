import axios from 'axios';
import { format, parseISO, isDate } from 'date-fns';
import { create } from 'zustand';
import { API_URL } from '../config';
// const API_URL = 'http://localhost:3000';
const BASE = API_URL.replace(/\/+$/, ''); // ← 도메인(끝 슬래시 제거)

// 안전한 JSON 로딩 유틸
const load = (key, fallback) => {
    try {
        const v = localStorage.getItem(key);
        return v ? JSON.parse(v) : fallback;
    } catch {
        return fallback;
    }
};
const toDate = (d) => (typeof d === 'string' ? parseISO(d) : isDate(d) ? d : new Date(d));
const ymd = (d) => format(toDate(d), 'yyyy-MM-dd');

const useMypageStore = create((set, get) => ({
    user: load('user', null),
    snsLinks: [],
    reservations: [],
    userCoupons: [],
    // 반려견 정보 등록
    myPets: [],

    videoHistory: [], // 서버에서 온 원본 리스트
    videoHistoryLite: [], // [{ id, koTitle, visual }] 만 담은 요약 리스트
    videoLikes: [], // 서버 원본(혹은 평탄화된 리스트)
    videoLikesLite: [], // [{id, koTitle, visual}] 전용
    // ✅ 내가 쓴 리뷰
    myReplies: [], // 서버 원본
    myRepliesLite: [], // 카드용 {id, videoId, koTitle, visual, text, score, dateStr}

    // =================== 초기화 ========================

    // 목록 조회
    fetchMyPets: async () => {
        const userId = get()?.user?._id;
        if (!userId) return;
        const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/pets`, {
            params: { userId },
        });
        set({ myPets: Array.isArray(data) ? data : [] });
    },

    // 추가
    createPet: async (pet) => {
        const userId = get()?.user?._id;
        if (!userId) throw new Error('로그인이 필요합니다.');
        const payload = { ...pet, userId };
        const { data } = await axios.post(`${API_URL.replace(/\/+$/, '')}/pets`, payload, {
            headers: { 'Content-Type': 'application/json' },
        });
        // 단건 반환이면 목록에 푸시, 아니면 refetch
        if (data && data._id) {
            set((s) => ({ myPets: [data, ...s.myPets] }));
        } else {
            await get().fetchMyPets();
        }
    },

    // 수정
    updatePet: async (petId, patch) => {
        const { data } = await axios.patch(`${API_URL.replace(/\/+$/, '')}/pets/${petId}`, patch, {
            headers: { 'Content-Type': 'application/json' },
        });
        if (data && data._id) {
            set((s) => ({
                myPets: s.myPets.map((p) => (p._id === data._id ? data : p)),
            }));
        } else {
            await get().fetchMyPets();
        }
    },

    // upsert: _id 있으면 수정, 없으면 생성
    upsertPet: async (pet) => {
        if (pet?._id) {
            const { _id, ...patch } = pet;
            await get().updatePet(_id, patch);
        } else {
            await get().createPet(pet);
        }
    },
    fetchSns: async (userId) => {
        try {
            // 서버에서 GET /sns/user/:userId → [{provider:'kakao', linkedAt:...}, ...] 가정
            const { data } = await axios.get(`${API_URL.replace(/\/+$/, '')}/sns/user/${userId}`);
            set({ snsLinks: Array.isArray(data) ? data : [], snsStatus: 'success' });
        } catch {
            // SNS가 없을 수도 있으니 조용히 빈배열
            set({ snsLinks: [], snsStatus: 'success' });
        }
    },
    fetchReservations: async (userId) => {
        try {
            const { data } = await axios.get(
                `${API_URL.replace(/\/+$/, '')}/reservation/user/${userId}`
            );
            set({ reservations: Array.isArray(data) ? data : [] });
        } catch (e) {}
    },

    fetchUserCoupons: async (userId) => {
        try {
            const { data } = await axios.get(
                `${API_URL.replace(/\/+$/, '')}/user-coupons/user/${userId}`
            );
            set({ userCoupons: Array.isArray(data) ? data : [] });
        } catch (e) {}
    },
    fetchVideoHistory: async () => {
        const userId = get()?.user?._id;
        if (!userId) return;

        try {
            const { data } = await axios.get(`${BASE}/video-history`, { params: { userId } });
            const raw = Array.isArray(data) ? data : [];

            const ids = [...new Set(raw.map((h) => h.videoId).filter(Boolean))];
            if (!ids.length) {
                set({ videoHistory: raw, videoHistoryLite: [] });
                return;
            }

            const results = await Promise.allSettled(
                ids.map((id) => axios.get(`${BASE}/video/${id}`))
            );
            const videoMap = {};
            results.forEach((r) => {
                if (r.status === 'fulfilled') {
                    const v = r.value?.data;
                    if (v && v._id) videoMap[v._id] = v;
                }
            });

            // helper: base + path 안전하게 합치기
            const withBase = (path) => {
                if (!path) return '';
                if (/^https?:\/\//i.test(path)) return path; // 이미 절대 URL
                return `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
            };

            const lite = raw
                .map((item) => {
                    const v = videoMap[item.videoId];
                    if (!v) return null;
                    const src = v.visual ?? v.thumb ?? '';
                    return {
                        id: v._id,
                        koTitle: v.koTitle ?? '',
                        visual: withBase(src), // ← BASE 붙여서 반환
                    };
                })
                .filter(Boolean);

            set({ videoHistory: raw, videoHistoryLite: lite });
        } catch (e) {
            set({ videoHistory: [], videoHistoryLite: [] });
            console.error('fetchVideoHistory error:', e?.response?.data || e);
        }
    },
    // 찜 목록 조회
    fetchVideoLikes: async () => {
        const userId = get()?.user?._id;
        if (!userId) return;

        const { data } = await axios.get(`${BASE}/video-like`, { params: { userId } });
        const rows = Array.isArray(data) ? data : [];

        // 서버가 populate로 koTitle/visual을 이미 붙여준다 가정
        const withBase = (path) => {
            if (!path) return '';
            if (/^https?:\/\//i.test(path)) return path;
            return `${BASE}${path.startsWith('/') ? '' : '/'}${path}`;
        };

        const lite = rows
            .map((r) => ({
                id: r.videoId,
                koTitle: r.koTitle || '',
                visual: withBase(r.visual || r.thumb || ''),
            }))
            .filter((v) => v.id && (v.koTitle || v.visual));

        set({ videoLikes: rows, videoLikesLite: lite });
    },

    // 찜 토글 (버튼 클릭용)
    toggleVideoLike: async (videoId) => {
        const userId = get()?.user?._id;
        if (!userId || !videoId) return;

        try {
            const { data } = await axios.post(
                `${BASE}/video-like/toggle`,
                { userId, videoId },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            );
            const liked = !!data?.liked;

            // 낙관적 갱신: 최소한 목록만 갱신
            await get().fetchVideoLikes();
            return liked;
        } catch (e) {
            console.error('toggleVideoLike error:', e?.response?.data || e);
            return null;
        }
    },
    // ✅ 내가 쓴 리뷰 조회
    fetchMyReplies: async () => {
        const userId = get()?.user?._id;
        if (!userId) return;

        try {
            // 서버 라우트 예: GET /reply/user/:userId  (네가 만든 컨트롤러에 맞춰 경로만 맞추면 됨)
            const { data } = await axios.get(`${BASE}/replies/user/${userId}`, {
                params: { page: 1, limit: 200 },
            });
            const rows = Array.isArray(data) ? data : data?.items || [];
            // rows: [{ _id, userId, videoId, text, star, regDate, ... }]

            // 1) 필요한 비디오 메타 모으기
            const ids = [...new Set(rows.map((r) => r.videoId).filter(Boolean))];
            const results = await Promise.allSettled(
                ids.map((id) => axios.get(`${BASE}/video/${id}`))
            );

            // 2) 매핑
            const videoMap = {};
            results.forEach((r) => {
                if (r.status === 'fulfilled') {
                    const v = r.value?.data;
                    if (v && (v._id || v.id)) videoMap[v._id || v.id] = v;
                }
            });

            // 3) 카드에서 바로 쓸 수 있게 가공
            const lite = rows
                .map((r) => {
                    const v = videoMap[r.videoId] || {};
                    const src = v.visual ?? v.thumb ?? '';
                    return {
                        id: r._id,
                        videoId: r.videoId,
                        koTitle: v.koTitle || '',
                        visual: `${BASE}${src}`,
                        text: r.text || '',
                        score: Number(r.star ?? 0),
                        dateStr: ymd(r.regDate),
                    };
                })
                .sort((a, b) => (b.dateStr > a.dateStr ? 1 : -1)); // 최신순

            set({ myReplies: rows, myRepliesLite: lite });
        } catch (e) {
            console.error('fetchMyReplies error:', e?.response?.data || e);
            set({ myReplies: [], myRepliesLite: [] });
        }
    },
    fetchAllForUser: async () => {
        const {
            user,
            fetchSns,
            fetchReservations,
            fetchUserCoupons,
            fetchVideoHistory,
            fetchVideoLikes,
            fetchMyReplies,
        } = get();
        const userId = user._id;

        await Promise.allSettled([
            fetchSns(userId),
            fetchReservations(userId),
            fetchUserCoupons(userId),
            fetchVideoHistory(),
            fetchVideoLikes(),
            fetchMyReplies(),
        ]);
    },
}));

export default useMypageStore;
