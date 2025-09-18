const Request = () => {
    const placeholder =
        '예) 사료 두 번 급여해주세요, 특이 질병 있음 (약 복용 시간 오전 9시), 사료 대신 간식 급여, 분리불안이 심해요';
    return (
        <section id="hotel_reservation_request">
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
                    ></textarea>
                </div>
            </div>
        </section>
    );
};

export default Request;
