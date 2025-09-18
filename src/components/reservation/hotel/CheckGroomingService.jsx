import { useState } from 'react';
import RadioInput from '../../common/RadioInput';

const GROOMING_TYPE = [
    { id: 1, type: '목욕', des: '기본 세정 + 드라이' },
    { id: 2, type: '부분 미용', des: '얼굴, 발 등 부분 커트' },
    { id: 3, type: '전체 미용', des: '전신 스타일링 커트' },
    { id: 4, type: '스포팅', des: '견종 라인 전문 커트' },
    { id: 5, type: '가위컷', des: '세밀한 수작업 컷' },
];
const CheckGroomingService = () => {
    const [beauty, setBeauty] = useState('no');
    const [option, setOption] = useState('');
    const [select, setSelect] = useState(0);
    const onChange = (value) => setBeauty(value);
    const onChangeOption = (value) => setOption(value);
    return (
        <section id="hotel_reservation_grooming">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">호텔링 중 미용 예약이 가능해요.</h3>
                    <p>숙박 중 미용 서비스도 함께 예약할 수 있어요.</p>

                    <fieldset className="radio_area" role="radiogroup" aria-label="미용 예약 여부">
                        <RadioInput
                            radioName="beauty"
                            radioValue="beauty"
                            sel={beauty}
                            handler={() => onChange('beauty')}
                            text="예뻐지러 갈게요!"
                        />
                        <RadioInput
                            radioName="no"
                            radioValue="no"
                            sel={beauty}
                            handler={() => onChange('no')}
                            text="괜찮아요ㅜㅜ"
                        />
                    </fieldset>

                    {beauty === 'beauty' && (
                        <ul className="beauties">
                            {GROOMING_TYPE.map((el) => (
                                <li
                                    key={el.id}
                                    onClick={() => {
                                        setSelect(el.id);
                                    }}
                                    className={el.id === select ? 'check' : ''}
                                >
                                    <div className="bold_text">{el.type}</div>
                                    <div className="g_text">{el.des}</div>
                                </li>
                            ))}
                        </ul>
                    )}

                    {beauty === 'beauty' && (
                        <div className="add_option">
                            <h4>추가옵션 선택하기</h4>
                            <p>지금 옵션을 추가하지 않더라도 현장에서 추가 가능해요</p>
                            <div className="radio_areas">
                                <p className="fst">
                                    <RadioInput
                                        radioName="option1"
                                        radioValue="option1"
                                        sel={option}
                                        handler={() => onChangeOption('option1')}
                                        text="얼굴컷 / 발톱 / 귀청소"
                                    />
                                    <RadioInput
                                        radioName="option2"
                                        radioValue="option2"
                                        sel={option}
                                        handler={() => onChangeOption('option2')}
                                        text="엉킴 제거 (정도에 따라)"
                                    />
                                </p>
                                <p className="sec">
                                    <RadioInput
                                        radioName="option3"
                                        radioValue="option3"
                                        sel={option}
                                        handler={() => onChangeOption('option3')}
                                        text="발바닥 각질 케어"
                                    />
                                    <RadioInput
                                        radioName="option4"
                                        radioValue="option4"
                                        sel={option}
                                        handler={() => onChangeOption('option4')}
                                        text="눈물 자국 케어"
                                    />
                                </p>
                                <p className="thd">
                                    <RadioInput
                                        radioName="option5"
                                        radioValue="option5"
                                        sel={option}
                                        handler={() => onChangeOption('option5')}
                                        text="탄산스파"
                                    />
                                    <RadioInput
                                        radioName="option6"
                                        radioValue="option6"
                                        sel={option}
                                        handler={() => onChangeOption('option6')}
                                        text="선택 안함"
                                    />
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default CheckGroomingService;
