import { useState } from 'react';
import useReservationStore from '../../../store/useReservationStore';

const Agree = () => {
    const [agree, setAgree] = useState(false);
    const form = useReservationStore((s) => s.form);
    const setLocalStorageForm = useReservationStore((s) => s.setLocalStorageForm);
    const onChange = (e) => {
        setAgree(e.target.checked);
    };

    const validate = () => {
        const { startDate, checkOut, size, groomingService } = form;

        if (startDate === '' || !startDate) {
            alert('입ㆍ퇴실 날짜를 선택해주세요.');
            return;
        } else if (checkOut === '' || !checkOut) {
            alert('퇴실 연장 여부를 체크를 해주세요.');
            return;
        } else if (size === '' || !size) {
            alert('사이즈를 선택해주세요.');
            return;
        } else if (groomingService === '' || !groomingService) {
            alert('미용 서비스를 여부를 선택해주세요.');
            return;
        } else if (!agree) {
            alert('개인정보 처리 방침 활용 동의를 눌러주세요.');
            return;
        }

        setLocalStorageForm();
    };

    return (
        <section id="grooming_reservation_agree">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">예약 전 안내사항 확인 및 동의</h3>
                    <p>
                        아래의 예약 안내사항을 반드시 확인해 주세요.
                        <br />
                        예약을 진행하시면 아래 모든 내용에 동의한 것으로 간주됩니다.
                    </p>
                    <div className="notification">
                        <div className="context">
                            <span>
                                1. 모든 미용 서비스는 예약제로 운영되며, 예약 변경 및 취소는 최소
                                하루 전까지 가능합니다.
                            </span>
                            <br />
                            <span>
                                2. 접종이 완료되지 않았거나, 최근 아픈 이력 또는 피부 질환이 있는
                                반려견은 반드시 사전 고지해 주세요.
                            </span>
                            <br />
                            <span>
                                3. 반려견이 긴장하지 않도록 평소 즐겨 먹는 간식을 지참해 주시면 미용
                                시 보상으로 활용됩니다.
                            </span>
                            <br />
                            <span>
                                4. 호텔링과 함께 미용을 진행하는 경우, 낯선 환경에서도 편하게 식사할
                                수 있도록 사료를 지참해 주세요.
                            </span>
                            <br />
                            <span>5. 미용만 이용 시에는 사료 지참이 필요하지 않습니다.</span>
                            <br />
                            <span>
                                6. 털 엉킴이 심할 경우, 추가 비용이 발생할 수 있으며 예상 소요
                                시간이 길어질 수 있습니다.
                            </span>
                            <span>
                                7. 예약 시간 15분 이상 지각 시, 서비스가 제한되거나 취소될 수
                                있습니다.
                            </span>
                        </div>
                    </div>

                    <div className="check__line">
                        <input id="agree" type="checkbox" checked={agree} onChange={onChange} />
                        <label htmlFor="agree" className={agree ? 'checked' : ''}>
                            <span>개인정보처리 방침에 따라 개인정보 수집ㆍ활용에 동의합니다.</span>
                        </label>
                    </div>

                    <span className="step_btn" onClick={validate}>
                        다음 단계
                    </span>
                </div>
            </div>
        </section>
    );
};

export default Agree;
