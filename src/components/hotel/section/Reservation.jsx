import { getWeekDays, ymd } from "../../../utils/Date";
import Content from "./Content";

const Reservation = () => {
  const baseDate = new Date();
  const days = getWeekDays(baseDate, 0, 0);
  return (
    <section id="hotel_reservation">
      <div className="inner">
        <p className="title">
          <span>이번 주 호강’s </span>
          <span className="color">호텔 예약 시간표</span>
        </p>

        <div className="calendar">
          <ul className="list">
            {days.map((day, idx) => (
              <Content key={idx} day={day} />
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
