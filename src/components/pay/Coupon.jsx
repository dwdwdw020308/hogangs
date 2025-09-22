import axios from 'axios';
import { useEffect, useState } from 'react';
import { API_URL } from '../../config';
import CouponSelect from './partials/coupon/CouponSelect';
import useReservationStore from '../../store/useReservationStore';
const Coupon = () => {
    const [coupons, setCoupons] = useState([]);

    const [selectedCoupon, setSelectedCoupon] = useState(null);
    const selectedCouponId = useReservationStore((s) => s.selectedCouponId);
    const setCouponId = useReservationStore((s) => s.setCouponId);
    const fmtKorean = (iso) => {
        try {
            const d = new Date(iso);
            return `(~${d.getMonth() + 1}월 ${d.getDate()}일)`;
        } catch {
            return '';
        }
    };
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));

        const getCoupons = async () => {
            const view = 'usable'; // 'usable' | 'expired' | 'all'
            const months = 4;
            const res = await axios.get(`${API_URL}/user-coupons/user/${user._id}`, {
                params: { view, months },
            });
            setCoupons(res.data);
        };

        getCoupons();
    }, []);

    const fnSelectCoupon = (id) => {
        const c = coupons.find((x) => (x._id ?? x.id) === id);
        setSelectedCoupon(c);

        setCouponId(c ? String(c._id ?? c.id) : ''); // 스토어엔 방금 찾은 id를 직접 저장
    };
    return (
        <section id="pay_coupon">
            <div className="inner">
                <div className="coupon_context">
                    <h3 className="title">쿠폰</h3>
                    <span className="coupon_line"></span>
                    {selectedCouponId === '' && (
                        <span className="none_coupon">사용하실 쿠폰이 없습니다.</span>
                    )}
                    {selectedCouponId !== '' && (
                        <div className="coupon_area">
                            <div className="coupon">
                                <div className="coupon_info">
                                    <span className="badge">
                                        {selectedCoupon.type === 'pass' ? '이용권' : '할인권'}
                                    </span>
                                    <span className="coupon_name">{selectedCoupon.name}</span>
                                    <span className="coupon_period">
                                        {fmtKorean(selectedCoupon.expiresAt)}까지 이용가능
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                    <CouponSelect
                        coupons={coupons}
                        value={selectedCouponId}
                        onChange={fnSelectCoupon}
                        fmtKorean={fmtKorean}
                    />
                </div>
                <div className="block"></div>
            </div>
        </section>
    );
};

export default Coupon;
