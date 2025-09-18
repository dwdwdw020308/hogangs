import { useState } from 'react';
import Radio from '../partials/Radio';

const CHECKOUT_TIME = ['09 : 00', '10 : 00', '11 : 00', '12 : 00'];
const CheckOutService = () => {
    const [enableTime, setEnableTime] = useState(false);
    const [selectTime, setSelectTime] = useState(0);
    return (
        <section id="hotel_reservation_checkout">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">퇴실 시간 연장이 필요하신가요?</h3>
                    <p>
                        체크아웃 시간 이후 퇴실 시에는 시간당 추가 요금이 발생합니다. <br />
                        미리 퇴실 연장을 예약하시거나,
                        <span className="bold">현장에서 편리하게 결제</span>하실 수 있습니다.
                    </p>
                    <Radio setEnableTime={setEnableTime} />
                    {enableTime && (
                        <ul className="times">
                            {CHECKOUT_TIME.map((i, idx) => (
                                <li
                                    className={selectTime === idx + 1 ? 'check' : ''}
                                    onClick={() => {
                                        setSelectTime(idx + 1);
                                    }}
                                >
                                    {i}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CheckOutService;
