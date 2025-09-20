import { useState } from 'react';
import RadioInput from '../common/RadioInput';

const TERMS = [
    {
        key: 'date',
        title: '이용 일자 준수 서약',
        body:
            '위탁자는 예약 시 정해진 이용 시간과 규정을 반드시 준수해야 하며, 이를 어길 시 발생하는 모든 상황에 대해 민형사상 책임을 집니다.\n' +
            '규정은 사전 공지 후 변경될 수 있으며, 변경 사항을 확인할 책임은 위탁자에게 있습니다.',
        radioKey: 'radio_date',
        text: '이용 일자를 준수할 것을 서약합니다.',
    },
    {
        key: 'penalty',
        title: '위약벌금 조항',
        body:
            '이용약을 준수하지 않아 발생한 비용(24시간)은 위탁자가 부담합니다. 예약 변경, 미숙향, 미사용 등에 따른 책임은 위탁자에게 있으며,\n ' +
            '사전에 규정된 시간을 초과할 경우 추가 비용이 부과됩니다.',
        radioKey: 'radio_penalty',
        text: '소유권 포기 조항에 동의 합니다.',
    },
    {
        key: 'ownership',
        title: '소유권 포기 조항',
        body:
            '위탁자가 이용일 및 이용시간, 이용 규정을 준수하지 아니하여 발생되는 모든 상황에 대하여 민/형사상 책임을 져야 합니다. \n' +
            '특히 반려견을 위탁하고 주최사와 연락 두절 또는 연장 여부 미확정이 장기간 지속되어 정상적 인도 절차가 불가능한 경우, \n' +
            '규정에 의해 포기의 소유권은 주최사(호강스)에게 이전될 수 있습니다.\n',
        radioKey: 'radio_ownership',
        text: '위 위약벌금 조항에 동의 합니다',
    },
];

const ReservationTerms = () => {
    const [open, setOpen] = useState(new Set());
    const [radio, setRadio] = useState(new Set());
    const [agree, setAgree] = useState({});

    const toggle = (key) => {
        setOpen((prev) => {
            const s = new Set(prev);
            s.has(key) ? s.delete(key) : s.add(key);
            return s;
        });
    };

    const agreeRadio = (key) => {
        setRadio((prev) => {
            const s = new Set(prev);
            s.has(key) ? s.delete(key) : s.add(key);
            return s;
        });
    };
    const onCheck = (key, checked) => {
        setAgree((prev) => {
            const next = { ...prev, [key]: checked };

            // if (onAgreeChange) {
            //     const allAgreed = TERMS.every((t) => next[t.key]);
            //     onAgreeChange(allAgreed, next);
            // }
            return next;
        });
    };
    return (
        <section id="pay_terms">
            <div className="inner">
                <div className="terms_context">
                    <h3 className="title">예약 이용 규정 및 동의</h3>
                    <ul className="terms">
                        {TERMS.map((term, idx) => (
                            <li key={idx}>
                                <div className={`term_content ${open.has(term.key) ? 'open' : ''}`}>
                                    <span className="term_title">{term.title}</span>
                                    <span className="term_line"></span>
                                    <span className="term_desc">{term.body}</span>
                                    <i
                                        className="icon"
                                        onClick={() => {
                                            toggle(term.key);
                                        }}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="19"
                                            height="20"
                                            viewBox="0 0 19 20"
                                            fill="none"
                                        >
                                            <path
                                                d="M9.75 1.25V18.75M1 10H18.5"
                                                stroke="#959595"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                            />
                                        </svg>
                                    </i>
                                </div>

                                <label className="choice">
                                    <input
                                        className="radio-donut"
                                        type="radio"
                                        name={term.radioKey}
                                        value={term.radioKey}
                                        checked={radio.has(term.radioKey)}
                                        onClick={() => {
                                            agreeRadio(term.radioKey);
                                        }}
                                    />

                                    <span className="txt">{term.text}</span>
                                </label>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default ReservationTerms;
