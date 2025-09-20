import { useState } from 'react';
import RadioInput from '../common/RadioInput';
const card_list = [
    'KB국민카드',
    'BC카드',
    '현대카드',
    '롯데카드',
    '하나카드',
    '삼성카드',
    '우리카드',
    '카카오뱅크',
    'NH카드',
    '그외',
];
const Payment = () => {
    const [payType, setPayType] = useState('card');
    const [checkPayment, setCheckPayment] = useState('');
    const onClick = (card) => {
        setCheckPayment(card);
    };
    return (
        <section id="payment_section">
            <div className="inner">
                <div className="payment_context">
                    <h3 className="title">결제수단</h3>
                    <div className="radios">
                        <RadioInput
                            radioName="card"
                            radioValue="card"
                            handler={() => {
                                setPayType('card');
                            }}
                            sel={payType}
                            text="신용카드"
                        />
                        <RadioInput
                            radioName="cash"
                            radioValue="cash"
                            sel={payType}
                            text="무통장입금"
                        />
                        <RadioInput
                            radioName="kakao"
                            radioValue="kakao"
                            sel={payType}
                            text="카카오페이"
                        />
                        <RadioInput
                            radioName="samsung"
                            radioValue="samsung"
                            sel={payType}
                            text="삼성페이"
                        />
                    </div>
                    <ul className="card_list">
                        {card_list.map((card, idx) => (
                            <li
                                className={card === checkPayment ? 'check' : ''}
                                key={idx}
                                onClick={() => {
                                    onClick(card);
                                }}
                            >
                                {card}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="block"></div>
            </div>
        </section>
    );
};

export default Payment;
