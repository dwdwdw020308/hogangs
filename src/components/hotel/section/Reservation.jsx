import HotelReservationSwiper from '../swiper/HotelReservationSwiper';

const Reservation = () => {
    return (
        <section id="hotel_reservation">
            <div className="inner">
                <p className="title">
                    <span>호강’s </span>
                    <span className="color">호텔 예약 시간표</span>
                </p>

                <div className="calendar">
                    {/* <ul className="list">
                        {days.map((day, idx) => (
                            <Content key={idx} day={day} />
                        ))}
                    </ul> */}
                    <HotelReservationSwiper />
                </div>
            </div>
        </section>
    );
};

export default Reservation;
