import { useState } from "react";
import Hotel from "../../components/reservation/Hotel";

const Reservation = () => {
  const [hotel, setHotel] = useState(true);

  return (
    <>
      <section id="reservation_top">
        <ul className="res_nav">
          <li
            onClick={() => {
              setHotel(true);
            }}
            className={hotel ? "active" : ""}
          >
            Hotel 예약
          </li>
          <li
            onClick={() => {
              setHotel(false);
            }}
            className={!hotel ? "active" : ""}
          >
            Grooming 예약
          </li>
        </ul>
      </section>
      <Hotel />
    </>
  );
};

export default Reservation;
