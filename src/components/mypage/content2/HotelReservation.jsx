import React from "react";

// HotelReservation.jsx
const HotelReservation = ({ isPast }) => {
  return (
    <div id="hotelReservationBox" className={isPast ? "past" : "upcoming"}>
      <div className="left">
        <img src="/mypage/hotelDog.png" alt="hotelDog" />
      </div>
      <div className="right">
        <p>호텔예약완료</p>
        <span className="date">
          25년 09월 18일 - <br />
          25년 09월 19일
        </span>
      </div>
    </div>
  );
};

export default HotelReservation;
