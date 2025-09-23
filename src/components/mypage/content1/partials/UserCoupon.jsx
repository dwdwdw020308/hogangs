import React, { useEffect, useState } from 'react';
import CouponItem from '../CouponItem';
import ExpiredCouponItem from '../ExpiredCouponItem';
import useMypageStore from '../../../../store/useMypageStore';

const UserCoupon = () => {
    const [couponTab, setCouponTab] = useState(0);
    const [periodTab, setPeriodTab] = useState(3);
    const userCoupons = useMypageStore((s) => s.userCoupons);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        const now = new Date();
        const end = new Date(now);
        end.setMonth(end.getMonth() + periodTab); // 개월 더하기
        const list = (Array.isArray(userCoupons) ? userCoupons : [])
            .filter((c) => c && typeof c === 'object')
            .filter((c) => c.status === couponTab) // 탭 상태 필터
            .filter((c) => {
                if (!c.expiresAt) return false;
                const exp = new Date(c.expiresAt);
                return exp >= now && exp <= end; // 기간내 만료
            })
            .sort((a, b) => new Date(a.expiresAt) - new Date(b.expiresAt)); // 만료 임박순 정렬

        setFiltered(list);
    }, [couponTab, periodTab]);
    return (
        <div className="coupon">
            <div className="title">
                <h2>쿠폰</h2>
            </div>
            <div className="tab">
                <ul className="couponTab">
                    <li className={couponTab === 0 ? 'on' : ''} onClick={() => setCouponTab(0)}>
                        사용 가능 쿠폰
                    </li>
                    <li className={couponTab === 1 ? 'on' : ''} onClick={() => setCouponTab(1)}>
                        사용기간 만료 쿠폰
                    </li>
                </ul>
                <ul className="subTab">
                    <li className={periodTab === 1 ? 'on' : ''} onClick={() => setPeriodTab(1)}>
                        1개월
                    </li>
                    <li className={periodTab === 3 ? 'on' : ''} onClick={() => setPeriodTab(3)}>
                        3개월
                    </li>
                    <li className={periodTab === 6 ? 'on' : ''} onClick={() => setPeriodTab(6)}>
                        6개월
                    </li>
                </ul>
            </div>

            <div className="couponList">
                {filtered.map((c) => (
                    <CouponItem key={c._id} data={c} />
                ))}
            </div>
        </div>
    );
};

export default UserCoupon;
