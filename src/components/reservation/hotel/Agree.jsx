import { useState } from 'react';
import useReservationStore from '../../../store/useReservationStore';
import { useNavigate } from 'react-router-dom';

const Agree = () => {
    const [agree, setAgree] = useState(false);
    const form = useReservationStore((s) => s.form);
    const setLocalStorageForm = useReservationStore((s) => s.setLocalStorageForm);
    const setBeingReservation = useReservationStore((s) => s.setBeingReservation);
    const navigate = useNavigate();
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
        setBeingReservation();
        navigate('/pay');
    };

    return (
        <section id="hotel_reservation_agree">
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
                                1. 호텔은 1견 1실 개별 공간으로 운영되어 다른 반려견과의 접촉 없이
                                안전하게 지낼 수 있습니다.
                            </span>
                            <br />
                            <span>
                                2. 호텔 내부는 24시간 CCTV로 관리되며, 보호자는 언제든지 실시간으로
                                아이의 모습을 확인할 수 있습니다.
                            </span>
                            <br />
                            <span>
                                3. 호텔에 머무는 동안 반려견의 활동 사진, 영상, 상태 체크 코멘트를
                                주기적으로 전송해드립니다.
                            </span>
                            <br />
                            <span>
                                4. 낮선 환경에서 머무는 동안 스트레스와 소화 부담을 최소화하기 위해
                                평소 먹던 사료를 꼭 챙겨와 주세요.
                            </span>
                            <br />
                            <span>
                                5. 전염성 질병, 특정 질환(심장병, 녹농균 등)이 있는 반려견은
                                안전상의 이유로 예약 및 입실이 제한될 수 있습니다.
                            </span>
                            <br />
                            <span>
                                6. 보호자 없이 떨어져 있는 동안에도 쾌적하고 안전한 관리 시스템을
                                철저히 운영합니다.
                            </span>
                            <br />
                            <br />
                            <span>체크인: 평일 오전 8시부터 오후 6시 사이 자유롭게 입실 가능</span>
                            <br />
                            <span>
                                체크아웃: 다음날 오전 8시까지 (초과 시 시간당 추가 요금 발생)
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
