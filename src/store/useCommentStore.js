// src/store/useCommentStore.js
import axios from 'axios';
import { create } from 'zustand';
import { API_URL } from '@/config';
// const API_URL = 'http://localhost:3000';
const BASE = API_URL.replace(/\/+$/, '');

const useCommentStore = create((set, get) => ({
    // 영상별 댓글 캐시: { [videoId]: { items, total, page, limit, loading } }
    byVideo: {},
    // 영상별 통계 캐시: { [videoId]: { count, avgStar, loading } }
    statsByVideo: {},
    // 내가 쓴 댓글
    myReplies: { items: [], total: 0, page: 1, limit: 20, loading: false },

    // ===== 조회 =====
    fetchVideoReplies: async (videoId, page = 1, limit = 100) => {
        if (!videoId) return;
        set((s) => ({
            byVideo: {
                ...s.byVideo,
                [videoId]: { ...(s.byVideo[videoId] || {}), loading: true },
            },
        }));
        try {
            const { data } = await axios.get(`${BASE}/replies`, {
                params: { videoId, page, limit },
            });
            const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
            const total = data?.total ?? items.length;
            set((s) => ({
                byVideo: { ...s.byVideo, [videoId]: { items, total, page, limit, loading: false } },
            }));
        } catch (e) {
            console.error('fetchVideoReplies', e?.response?.data || e);
            set((s) => ({
                byVideo: {
                    ...s.byVideo,
                    [videoId]: { ...(s.byVideo[videoId] || {}), loading: false },
                },
            }));
        }
    },

    fetchVideoStats: async (videoId) => {
        if (!videoId) return;
        set((s) => ({
            statsByVideo: {
                ...s.statsByVideo,
                [videoId]: { ...(s.statsByVideo[videoId] || {}), loading: true },
            },
        }));
        try {
            const { data } = await axios.get(`${BASE}/replies/video/${videoId}/stats`);
            set((s) => ({
                statsByVideo: {
                    ...s.statsByVideo,
                    [videoId]: {
                        count: data?.count ?? 0,
                        avgStar: data?.avgStar ?? 0,
                        loading: false,
                    },
                },
            }));
        } catch (e) {
            set((s) => ({
                statsByVideo: {
                    ...s.statsByVideo,
                    [videoId]: { count: 0, avgStar: 0, loading: false },
                },
            }));
        }
    },

    fetchMyReplies: async (userId, page = 1, limit = 20) => {
        if (!userId) return;
        set((s) => ({ myReplies: { ...s.myReplies, loading: true } }));
        try {
            const { data } = await axios.get(`${BASE}/replies/user/${userId}`, {
                params: { page, limit },
            });
            const items = Array.isArray(data?.items) ? data.items : Array.isArray(data) ? data : [];
            const total = data?.total ?? items.length;
            set({ myReplies: { items, total, page, limit, loading: false } });
        } catch (e) {
            console.error('fetchMyReplies', e?.response?.data || e);
            set((s) => ({ myReplies: { ...s.myReplies, loading: false } }));
        }
    },

    // ===== 작성/수정/삭제/좋아요 =====
    createReply: async ({ userId, videoId, text, star = 0 }) => {
        console.log(userId, videoId, text, star);
        if (!userId || !videoId || !text?.trim()) throw new Error('userId/videoId/text 필요');
        const { data } = await axios.post(
            `${BASE}/replies`,
            { userId, videoId, text, star },
            {
                headers: { 'Content-Type': 'application/json' },
            }
        );
        // 캐시에 prepend
        set((s) => {
            const block = s.byVideo[videoId] || {
                items: [],
                total: 0,
                page: 1,
                limit: 100,
                loading: false,
            };
            return {
                byVideo: {
                    ...s.byVideo,
                    [videoId]: {
                        ...block,
                        items: [data, ...(block.items || [])],
                        total: (block.total || 0) + 1,
                    },
                },
            };
        });
        // 통계 새로고침
        get().fetchVideoStats(videoId);
        return data;
    },

    updateReply: async ({ replyId, videoId, patch }) => {
        if (!replyId) throw new Error('replyId 필요');
        const { data } = await axios.patch(`${BASE}/replies/${replyId}`, patch, {
            headers: { 'Content-Type': 'application/json' },
        });
        // 캐시 반영(해당 videoId만)
        if (videoId) {
            set((s) => {
                const block = s.byVideo[videoId];
                if (!block) return {};
                return {
                    byVideo: {
                        ...s.byVideo,
                        [videoId]: {
                            ...block,
                            items: block.items.map((r) => (r._id === data._id ? data : r)),
                        },
                    },
                };
            });
        }
        // 통계 갱신(별점 바뀌었을 수 있음)
        if (videoId) get().fetchVideoStats(videoId);
        return data;
    },

    deleteReply: async ({ replyId, videoId }) => {
        if (!replyId) throw new Error('replyId 필요');
        await axios.delete(`${BASE}/replies/${replyId}`);
        if (videoId) {
            set((s) => {
                const block = s.byVideo[videoId];
                if (!block) return {};
                const removed = block.items.some((r) => r._id === replyId);
                return {
                    byVideo: {
                        ...s.byVideo,
                        [videoId]: {
                            ...block,
                            items: block.items.filter((r) => r._id !== replyId),
                            total: removed ? Math.max(0, (block.total || 0) - 1) : block.total,
                        },
                    },
                };
            });
            get().fetchVideoStats(videoId);
        }
        return { deleted: true };
    },

    likeReply: async ({ replyId, videoId, amount = 1 }) => {
        if (!replyId) return;
        // 낙관적 UI
        if (videoId) {
            set((s) => {
                const block = s.byVideo[videoId];
                if (!block) return {};
                return {
                    byVideo: {
                        ...s.byVideo,
                        [videoId]: {
                            ...block,
                            items: block.items.map((r) =>
                                r._id === replyId
                                    ? { ...r, like: Math.max(0, (r.like ?? 0) + amount) }
                                    : r
                            ),
                        },
                    },
                };
            });
        }
        try {
            await axios.post(`${BASE}/replies/${replyId}/like`, { amount });
        } catch (e) {
            // 롤백
            if (videoId) {
                set((s) => {
                    const block = s.byVideo[videoId];
                    if (!block) return {};
                    return {
                        byVideo: {
                            ...s.byVideo,
                            [videoId]: {
                                ...block,
                                items: block.items.map((r) =>
                                    r._id === replyId
                                        ? { ...r, like: Math.max(0, (r.like ?? 0) - amount) }
                                        : r
                                ),
                            },
                        },
                    };
                });
            }
            throw e;
        }
    },
}));

export default useCommentStore;
