import DayPick from '../partials/DayPick';
import Steps from '../partials/Steps';

const Calendar = ({ setForm, setModalShow }) => {
    return (
        <section id="grooming_reservation_calendar">
            <div className="inner">
                <div className="step_area">
                    <div className="board">
                        <h3 className="title">지금은 미용 예약 단계입니다.</h3>
                        <Steps type="grooming" />
                    </div>
                    <div
                        className="price_modal_btn"
                        onClick={() => {
                            setModalShow(true);
                        }}
                    >
                        Grooming 가격 보기
                    </div>
                </div>
                <DayPick setForm={setForm} />
            </div>
        </section>
    );
};

export default Calendar;
