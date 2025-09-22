import { useState } from 'react';
import RadioInput from '../../common/RadioInput';
import useReservationStore from '../../../store/useReservationStore';

const GROOMING_TYPE = [
    { id: 1, type: '목욕', des: '기본 세정 + 드라이' },
    { id: 2, type: '부분 미용', des: '얼굴, 발 등 부분 커트' },
    { id: 3, type: '전체 미용', des: '전신 스타일링 커트' },
    { id: 4, type: '스포팅', des: '견종 라인 전문 커트' },
    { id: 5, type: '가위컷', des: '세밀한 수작업 컷' },
];
const CheckGroomingService = () => {
    const [option, setOption] = useState('');
    const [select, setSelect] = useState(0);
    const setStepProcesses = useReservationStore((s) => s.setStepProcesses);
    const setFormField = useReservationStore((s) => s.setFormField);

    const onSelect = (value) => {
        setSelect(value);
        const type = GROOMING_TYPE.find((i) => i.id === value).type;
        setFormField('type', type);
    };
    const onChangeOption = (value) => {
        setOption(value);
        let option = '';
        switch (value) {
            case 'option1':
                option = '얼굴컷 / 발톱 / 귀청소';
                break;
            case 'option2':
                option = '엉킴 제거';
                break;
            case 'option3':
                option = '발바닥 각질 케어';
                break;
            case 'option4':
                option = '눈물 자국 케어';
                break;
            case 'option5':
                option = '탄산스파';
                break;
            case 'option6':
                option = '선택 안함';
                break;
        }
        setFormField('option', option);
        setStepProcesses({ 4: 'done', 5: 'ing' });
    };
    return (
        <section id="grooming_reservation_grooming">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">원하시는 미용 서비스를 선택해주세요.</h3>
                    <p>
                        목욕/부분미용 소요시간 : 1시간
                        <br />
                        전체미용/스포팅/가위컷: 2시간 이내
                    </p>

                    <ul className="beauties">
                        {GROOMING_TYPE.map((el) => (
                            <li
                                key={el.id}
                                onClick={() => {
                                    onSelect(el.id);
                                }}
                                className={el.id === select ? 'check' : ''}
                            >
                                <div className="bold_text">{el.type}</div>
                                <div className="g_text">{el.des}</div>
                            </li>
                        ))}
                    </ul>

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
                </div>
            </div>
        </section>
    );
};

export default CheckGroomingService;
