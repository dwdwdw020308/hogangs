import { format, isValid, parse } from 'date-fns';
import { ko } from 'date-fns/locale';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { API_URL } from '../../config';
import useReservationStore from '../../store/useReservationStore';
const formatYMD = (iso) => {
    if (!iso) return '';
    const d = new Date(iso); // 로컬 타임존으로 변환
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0'); // MM
    const day = String(d.getDate()).padStart(2, '0'); // dd
    return `${y}-${m}-${day}`;
};

const getWeekDay = (value) => {
    if (!value) return '';
    const d = value instanceof Date ? value : parse(String(value), 'yyyy-MM-dd', new Date()); // 로컬 자정

    if (!isValid(d)) return '';
    return format(d, 'EEE', { locale: ko }); // '금', '토' ...
};
const toKoMeridiem24h = (time) => {
    if (time == null) return '';
    const m = String(time).match(/^\s*(\d{1,2})\s*:?\s*(\d{0,2})\s*$/);
    if (!m) return '';
    let h = Number(m[1]);
    let min = m[2] ? Number(m[2]) : 0;

    h = ((h % 24) + 24) % 24; // 24시 이상/음수 방어
    min = Math.min(Math.max(min, 0), 59);

    const period = h >= 12 ? '오후' : '오전';
    const hh = String(h).padStart(2, '0');
    const mm = String(min).padStart(2, '0');

    return `${period} ${hh}:${mm}`;
};
const Result = () => {
    const { id } = useParams();
    const [reservationData, setReservationData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCoupon, setIsCoupon] = useState(false);
    const [couponInfo, setCouponInfo] = useState({});
    const cancelReservation = useReservationStore((s) => s.cancelReservation);

    const navigate = useNavigate();
    //go to main
    const GoMain = () => {
        navigate('/');
    };

    const ReservationCancel = () => {
        //현재 예약 취소

        cancelReservation(reservationData._id, reservationData.couponId);
        alert('취소되었습니다.');

        navigate('/');
    };

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`${API_URL}/reservation/${id}`);
                console.log(data);
                setReservationData(data);

                if (data.couponId !== '') {
                    setIsCoupon(true);
                    const { data: coupon } = await axios.get(
                        `${API_URL}/user-coupons/${data.couponId}`,
                        {
                            headers: { 'Content-Type': 'application/json' },
                        }
                    );
                    setCouponInfo(coupon);
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        })();
    }, [id]);

    if (!reservationData) {
        return (
            <section id="pay_result">
                <div className="inner">데이터를 불러오지 못했습니다.</div>
            </section>
        );
    }
    if (loading) {
        return (
            <section id="pay_result">
                <div className="inner">불러오는 중...</div>
            </section>
        );
    }

    return (
        <section id="pay_result">
            <div className="inner">
                <h2 className="logo"></h2>
                <div className="receipt">
                    <div className="receipt_inner">
                        <ul className="detail">
                            {reservationData.resType === 'hotel' && (
                                <>
                                    <li className="reservation_data">
                                        <span className="label">객실</span>
                                        <span className="value">{reservationData.size}</span>
                                    </li>
                                    <li className="reservation_data">
                                        <span className="label">일정</span>
                                        <span className="value">
                                            {formatYMD(reservationData.startDate)}(
                                            {getWeekDay(formatYMD(reservationData.startDate))}) ~
                                            {formatYMD(reservationData.endDate)}(
                                            {getWeekDay(formatYMD(reservationData.endDate))})
                                        </span>
                                    </li>
                                </>
                            )}
                            {reservationData.resType === 'grooming' && (
                                <>
                                    <li className="reservation_data">
                                        <span className="label">체급</span>
                                        <span className="value">{reservationData.size}</span>
                                    </li>
                                    <li className="reservation_data">
                                        <span className="label">일정</span>
                                        <span className="value">
                                            {formatYMD(reservationData.startDate)}(
                                            {getWeekDay(formatYMD(reservationData.startDate))})/
                                            {toKoMeridiem24h(reservationData.beautyTime)}
                                        </span>
                                    </li>
                                </>
                            )}
                            <li className="reservation_data">
                                <span className="label">미용</span>
                                <span className="value">{reservationData.beautyType}</span>
                            </li>
                            <li className="reservation_data">
                                <span className="label">옵션</span>
                                <span className="value">{reservationData.beautyOption}</span>
                            </li>
                        </ul>
                        <span className="line"></span>

                        <div className="coupon">
                            <span className="label">쿠폰</span>
                            {isCoupon && <span className="value">{couponInfo.name}</span>}
                            {!isCoupon && <span className="value">X</span>}
                        </div>
                        <span className="line"></span>
                        <div className="price">
                            <span className="label">총 결제금액</span>
                            <span className="value">
                                {reservationData.totalPrice.toLocaleString()}원
                            </span>
                        </div>
                    </div>
                </div>
                <div className="buttons">
                    <span className="home" onClick={GoMain}>
                        메인으로
                    </span>
                    <span className="cancel" onClick={ReservationCancel}>
                        예약취소
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Result;
