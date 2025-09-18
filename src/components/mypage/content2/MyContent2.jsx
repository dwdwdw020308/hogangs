import React, { useState } from "react";
import HotelReservation from "./HotelReservation";
import GroomingReservation from "./GroomingReservation";
import Review from "./Review";

const MyContent2 = () => {
  // ✅ 탭 상태 (upcoming / past)
  const [activeTab, setActiveTab] = useState("upcoming");

  // ✅ 예시 데이터 (나중에 API 연동 가능)
  const upcomingReservations = [
    { id: 1, type: "hotel" },
    { id: 2, type: "grooming" },
  ];
  const pastReservations = [
    { id: 3, type: "hotel" },
    { id: 4, type: "grooming" },
  ];

  return (
    <section id="mycontent2">
      <div className="inner">
        {/* 예약 현황 */}
        <div className="reservation">
          <div className="title">
            <h2>예약 현황</h2>
          </div>

          <ul className="tab">
            <li
              className={activeTab === "upcoming" ? "on" : ""}
              onClick={() => setActiveTab("upcoming")}
            >
              다가오는 예약
            </li>
            <li
              className={activeTab === "past" ? "on" : ""}
              onClick={() => setActiveTab("past")}
            >
              지난 예약
            </li>
          </ul>

          {/* 예약 목록 */}
          {activeTab === "upcoming" ? (
            upcomingReservations.length === 0 ? (
              <div className="reservationList empty">
                <span>다가오는 예약이 없습니다.</span>
              </div>
            ) : (
              <div className="reservationList hasData">
                {upcomingReservations.map((res) =>
                  res.type === "hotel" ? (
                    <HotelReservation key={res.id} />
                  ) : (
                    <GroomingReservation key={res.id} />
                  )
                )}
              </div>
            )
          ) : pastReservations.length === 0 ? (
            <div className="reservationList empty">
              <span>지난 예약이 없습니다.</span>
            </div>
          ) : (
            <div className="reservationList hasData">
              {pastReservations.map((res) =>
                res.type === "hotel" ? (
                  <HotelReservation key={res.id} isPast />
                ) : (
                  <GroomingReservation key={res.id} isPast />
                )
              )}
            </div>
          )}
        </div>

        {/* 작성 후기 */}
        <div className="review">
          <div className="title">
            <h2>작성 후기</h2>
          </div>
          <div className="reviewList hasData">
            <Review />
            <Review />
            <Review />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyContent2;
