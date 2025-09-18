import React from "react";

const GroomingReservation = ({ isPast }) => {
  return (
    <div
      id="groomingReservationBox"
      className={`groomingReservationBox ${isPast ? "past" : "upcoming"}`}
    >
      <div className="left">
        <img src="/mypage/groomingDog.png" alt="groomingDog" />
      </div>
      <div className="right">
        <p>미용예약완료</p>
        <span className="date">
          25년 09월 18일 <br />
          17:00
        </span>
      </div>
    </div>
  );
};

export default GroomingReservation;
