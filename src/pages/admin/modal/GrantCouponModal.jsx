import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../config';

export default function GrantCouponModal({ userId, onClose, onSuccess }) {
    const [coupons, setCoupons] = useState([]);
    const [couponId, setCouponId] = useState('');
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const backdropRef = useRef(null);

    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose?.();
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [onClose]);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_URL}/coupon`);
                setCoupons(Array.isArray(data) ? data : []);
            } catch (e) {
                alert(e?.response?.data?.message || e.message || '쿠폰 목록 로드 실패');
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const closeIfBackdrop = (e) => {
        if (e.target === backdropRef.current) onClose?.();
    };

    const canSubmit = !!userId && !!couponId && !submitting;

    const submit = async (e) => {
        e.preventDefault();
        if (!canSubmit) return;
        try {
            setSubmitting(true);
            const payload = { userId, couponId };
            const { data } = await axios.post(`${API_URL}/user-coupons`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });
            if (data.error) throw new Error(data.message || '쿠폰 지급 실패');
            onSuccess?.();
        } catch (e) {
            alert(e?.response?.data?.message || e.message || '쿠폰 지급 실패');
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
                aria-labelledby="grant-coupon-title"
            >
                <h2 id="grant-coupon-title" style={{ margin: 0, marginBottom: 10 }}>
                    쿠폰 지급
                </h2>
                {loading ? (
                    <div className="sk lg" />
                ) : (
                    <form className="video-form" onSubmit={submit}>
                        <div className="row-2">
                            <div>
                                <label>쿠폰</label>
                                <select
                                    value={couponId}
                                    onChange={(e) => setCouponId(e.target.value)}
                                >
                                    <option value="">선택하세요</option>
                                    {coupons.map((c) => (
                                        <option key={c.id ?? c._id} value={c.id ?? c._id}>
                                            {c.name} / {c.type === 'pass' ? '이용권' : '할인권'} /{' '}
                                            {c.validDays}일
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label>대상 회원</label>
                                <input type="text" value={userId} readOnly />
                            </div>
                        </div>

                        <div className="actions">
                            <button type="button" onClick={onClose} disabled={submitting}>
                                취소
                            </button>
                            <button className="primary" type="submit" disabled={!canSubmit}>
                                {submitting ? '지급 중…' : '지급'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
