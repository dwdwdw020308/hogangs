import React from 'react';

const HotelReservation = () => {
    return (
        <div className="hotelReservationBox" id="hotelReservationBox">
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
