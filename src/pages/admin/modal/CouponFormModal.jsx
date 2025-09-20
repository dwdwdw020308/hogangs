// src/pages/admin/modal/CouponFormModal.jsx
import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';
export default function CouponFormModal({ mode = 'create', initial, onClose, onSuccess }) {
    const [name, setName] = useState(initial?.name ?? '');
    const [type, setType] = useState(initial?.type ?? 'pass'); // 'pass' | 'discount'
    const [validDays, setValidDays] = useState(
        initial?.validDays != null ? Number(initial.validDays) : 1
    );
    const [submitting, setSubmitting] = useState(false);

    const backdropRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'Escape') onClose?.();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    const closeIfBackdrop = (e) => {
        if (e.target === backdropRef.current) onClose?.();
    };

    const canSubmit =
        name.trim() !== '' && (type === 'pass' || type === 'discount') && validDays > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!canSubmit || submitting) return;

        try {
            setSubmitting(true);
            const payload = {
                name: name.trim(),
                type, // 'pass' | 'discount' (라벨은 한글로 보여줌)
                validDays: Number(validDays),
            };

            if (mode === 'edit' && (initial?.id || initial?._id)) {
                const id = initial.id ?? initial._id;
                await axios.put(`${API_URL}/coupon/${id}`, payload, {
                    headers: { 'Content-Type': 'application/json' },
                });
            } else {
                await axios.post(`${API_URL}/coupon`, payload, {
                    headers: { 'Content-Type': 'application/json' },
                });
            }

            onSuccess?.();
        } catch (err) {
            const msg = err?.response?.data?.message || err?.message || '쿠폰 저장에 실패했습니다.';
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop" ref={backdropRef} onMouseDown={closeIfBackdrop}>
            <div
                className="modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="coupon-modal-title"
            >
                <h2 id="coupon-modal-title" style={{ margin: 0, marginBottom: 10 }}>
                    {mode === 'edit' ? '쿠폰 수정' : '쿠폰 등록'}
                </h2>

                <form className="video-form" onSubmit={handleSubmit}>
                    <div className="row-2">
                        <div>
                            <label>쿠폰명</label>
                            <input
                                type="text"
                                placeholder="예) 신규가입 웰컴 쿠폰"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label>타입</label>
                            <select value={type} onChange={(e) => setType(e.target.value)}>
                                <option value="pass">이용권</option>
                                <option value="discount">할인권</option>
                            </select>
                        </div>
                    </div>

                    <div className="row-3">
                        <div>
                            <label>사용 가능일수</label>
                            <input
                                type="number"
                                min={1}
                                step={1}
                                value={validDays}
                                onChange={(e) =>
                                    setValidDays(Math.max(1, Number(e.target.value || 0)))
                                }
                            />
                        </div>
                    </div>

                    {/* 필요 시 설명/메모가 있으면 아래에 textarea 추가 가능 */}
                    {/* <label className="full">설명</label>
          <textarea className="full" value={desc} onChange={...} /> */}

                    <div className="actions">
                        <button type="button" onClick={onClose} disabled={submitting}>
                            취소
                        </button>
                        <button
                            className="primary"
                            type="submit"
                            disabled={!canSubmit || submitting}
                            style={{ opacity: !canSubmit || submitting ? 0.6 : 1 }}
                        >
                            {submitting ? '저장 중…' : mode === 'edit' ? '수정 저장' : '등록'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
