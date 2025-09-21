import User from './partials/step1/User';
import Goods from './partials/step1/Goods';
import Receipt from './partials/step1/Receipt';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../../config';
import useReservationStore from '../../store/useReservationStore';

// 메인 컴포넌트
const PaymentInfo = ({ resType, form }) => {
    const [payAgree, setPayAgree] = useState(false);
    const [btnEnable, setBtnEnable] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const paymentProcessValidate = useReservationStore((s) => s.paymentProcessValidate);
    const navigate = useNavigate();

    const buildPayload = () => {
        // form에서 필요한 값들 구조분해 (네 프로젝트 키 기준으로 맞춰주세요)

        const user = JSON.parse(localStorage.getItem('user'));
        const reservationForm = JSON.parse(localStorage.getItem('reservationForm'));
        const {
            checkOut,
            checkOutTime,
            endDate,
            groomingService,
            nights,
            option,
            requestMessage,
            resType,
            size,
            startDate,
            type,
            resTime,
        } = reservationForm;
        return {
            userId: user._id,
            resType, // prop으로 받는 값
            name: user.name,
            email: user.email,
            phone: user.phone,
            regDate: new Date(), // ISO 문자열 권장: "2025-09-20T12:00:00Z"
            startDate,
            endDate,
            lateCheckOutTime: checkOutTime ?? '', // 없으면 빈값/undefined 중 택1 (DTO @IsOptional이면 undefined 추천)
            beautyTime: resTime ?? '',
            size: size ?? '',
            beautyType: type ?? '',
            beautyOption: option ?? '',
            totalPrice: Number(totalPrice) || 0,
            // couponId: couponId ?? '',
            couponId: '',
            request: requestMessage ?? '',
        };
    };

    const clickEvent = () => {
        setPayAgree((prev) => !prev);
        setBtnEnable((prev) => !prev);
    };

    const onClickPayment = async () => {
        if (submitting) return;

        const result = paymentProcessValidate();
        if (!result.ok) {
            alert(result.message); // 첫 미완료 항목에 맞는 알럿
            // 필요하면 해당 섹션으로 스크롤/열기 처리도 여기서
            return;
        }

        const payload = buildPayload();
        try {
            const { data: json } = await axios.post(`${API_URL}/reservation`, payload, {
                headers: { 'Content-Type': 'application/json' },
            });

            // 서버 응답 형식: { error, message, data } 가정
            if (json.error !== 0) {
                throw new Error(json.message || '예약 저장에 실패했습니다.');
            }

            const id = json?.data?.id;
            console.log(id);
            // navigate(`/payment/success/${id}`);
        } catch (err) {
            // axios는 2xx가 아니면 예외를 던짐
            const msg =
                err?.response?.data?.message || err?.message || '처리 중 오류가 발생했습니다.';
            alert(msg);
        } finally {
            setSubmitting(false);
        }
    };
    return (
        <section id="pay_step1">
            <div className="inner">
                <div className="pay_left">
                    <Goods resType={resType} form={form} />
                    <User /> {/* 사용자 정보 입력 */}
                </div>
                <div className="pay_right">
                    <Receipt
                        resType={resType}
                        form={form}
                        totalPrice={totalPrice}
                        setTotalPrice={setTotalPrice}
                    />
                    <div className="pay_agree">
                        <div className="pay_agree_inner">
                            <div className="check__line">
                                <input
                                    id="chkAgree"
                                    type="checkbox"
                                    checked={payAgree}
                                    onChange={clickEvent}
                                />
                                <label htmlFor="chkAgree" className={payAgree ? 'checked' : ''}>
                                    <span>구매조건 및 결제 진행 동의</span>
                                </label>
                            </div>
                            <div className="text_area">
                                <p>본 결제는 호강스 호텔 및 미용 서비스 예약에 해당합니다.</p>
                                <p>결제 완료 시 아래 내용을 확인하고 동의한 것으로 간주됩니다.</p>
                                <br />
                                <p>
                                    - 취소·환불 규정에 따라 취소 시 환불 금액이 달라질 수 있습니다.
                                </p>
                                <p>- 퇴실 연장 및 일부 추가 서비스는 현장에서 별도 결제됩니다.</p>
                                <p>- 현장 결제 금액은 체크아웃 시 정확히 안내드립니다.</p>
                                <p className="last"> (전자상거래법 제8조 2항)</p>
                            </div>
                        </div>
                    </div>
                    <span
                        disabled={btnEnable}
                        className={`btn_payment ${btnEnable ? 'enable' : ''}`}
                        onClick={onClickPayment}
                    >
                        {totalPrice.toLocaleString()}원 결제하기
                    </span>
                </div>
            </div>
        </section>
    );
};

export default PaymentInfo;
