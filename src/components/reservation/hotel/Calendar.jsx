import Steps from "../partials/Steps";

const Calendar = () => {
  return (
    <section id="hotel_reservation_calendar">
      <div className="inner">
        <div className="step_area">
          <div className="board">
            <h3 className="title">지금은 호텔 예약 단계입니다.</h3>
            <Steps type="hotel" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calendar;
