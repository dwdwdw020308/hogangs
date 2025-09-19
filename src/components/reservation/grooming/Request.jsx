import { useState } from 'react';
import useReservationStore from '../../../store/useReservationStore';

const Request = () => {
    const [request, setRequest] = useState('');
    const setFormField = useReservationStore((s) => s.setFormField);
    const placeholder =
        '예) 얼굴은 둥글게, 꼬리는 짧게 / 피부 알러지 있어 순한 샴푸 사용 / 귀청소 꼼꼼히 부탁드려요';
    const onChange = (e) => {
        const value = e.target.value;
        setRequest(value);
        setFormField('requestMessage', value);
    };
    return (
        <section id="grooming_reservation_request">
            <div className="inner">
                <div className="block"></div>
                <div className="check_area">
                    <h3 className="title">요청사항을 입력해주세요.</h3>
                    <p>호강이에게 특이사항 또는 요청사항이 있다면 알려주세요.</p>
                    <textarea
                        className="note-textarea"
                        name="request"
                        id="request"
                        placeholder={placeholder}
                        value={request}
                        onChange={onChange}
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default Request;
