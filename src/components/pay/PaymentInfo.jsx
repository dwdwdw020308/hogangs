import User from './partials/step1/User';
import Goods from './partials/step1/Goods';
import Receipt from './partials/step1/Receipt';
import { useState } from 'react';

// 메인 컴포넌트
const PaymentInfo = ({ resType, form }) => {
    const [payAgree, setPayAgree] = useState(false);
    const [btnEnable, setBtnEnable] = useState(false);
    const [totalPrice, setTotalPrice] = useState(0);
    const clickEvent = () => {
        setPayAgree(!payAgree);
        setBtnEnable(!btnEnable);
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
                    >
                        {totalPrice.toLocaleString()}원 결제하기
                    </span>
                </div>
            </div>
        </section>
    );
};

export default PaymentInfo;
