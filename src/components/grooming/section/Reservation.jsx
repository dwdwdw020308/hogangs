import GroomingReservationSwiper from "../swiper/GroomingReservationSwiper";

const Reservation = () => {
  return (
    <section id="grooming_reservation">
      <div className="inner">
        <p className="title">
          <span>호강’s </span>
          <span className="color">미용 예약 시간표</span>
        </p>

        <div className="calendar">
          <GroomingReservationSwiper />
        </div>
      </div>
    </section>
  );
};

export default Reservation;
