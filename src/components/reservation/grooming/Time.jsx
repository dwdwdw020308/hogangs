import { useState } from 'react';
import useReservationStore from '../../../store/useReservationStore';

const RES_TIME = [
    '10 : 00',
    '11 : 00',
    '12 : 00',
    '13 : 00',
    '14 : 00',
    '15 : 00',
    '16 : 00',
    '17 : 00',
    '18 : 00',
    '19 : 00',
    '20 : 00',
    '21 : 00',
];

const Time = () => {
    const [selectTime, setSelectTime] = useState(0);
    const setStepProcesses = useReservationStore((s) => s.setStepProcesses);
    const setFormField = useReservationStore((s) => s.setFormField);
    const onClick = (idx) => {
        setSelectTime(idx + 1);
        setFormField('resTime', RES_TIME[idx]);
        setStepProcesses({ 2: 'done', 3: 'ing' });
    };
    return (
        <section id="grooming_reservation_time">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">가능한 예약 시간을 선택해주세요</h3>
                    <p>
                        기본 1시간 단위로 예약이 진행됩니다.
                        <br />
                        전체미용 및 스포팅은 2시간 연속 예약이 자동으로 적용됩니다.
                    </p>
                    <ul className="times">
                        {RES_TIME.map((i, idx) => (
                            <li
                                key={idx}
                                className={selectTime === idx + 1 ? 'check' : ''}
                                onClick={() => {
                                    onClick(idx);
                                }}
                            >
                                {i}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Time;
