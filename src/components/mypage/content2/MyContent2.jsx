import React from 'react';
import HotelReservation from './HotelReservation';
import GroomingReservation from './GroomingReservation';
import Review from './Review';

const MyContent2 = () => {
    return (
        <section id="mycontent2">
            <div className="inner">
                <div className="reservation">
                    <div className="title">
                        <h2>예약 현황</h2>
                    </div>
                    <ul className="tab">
                        <li className="on">다가오는 예약</li>
                        <li>지난 예약</li>
                    </ul>
                    {/* <div className="reservationList empty">
                        <span>진행 중인 예약이 없습니다.</span>
                    </div> */}
                    <div className="reservationList hasData">
                        <HotelReservation />
                        <GroomingReservation />
                    </div>
                </div>
                <div className="review">
                    <div className="title">
                        <h2>작성 후기</h2>
                    </div>
                    {/* <div className="reviewList empty">
                        <p>작성하신 후기가 없습니다.</p>
                    </div> */}
                    <div className="reviewList hasData">
                        <Review />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyContent2;
