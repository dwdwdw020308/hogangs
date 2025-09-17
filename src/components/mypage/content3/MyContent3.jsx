import React from "react";
import RecordItem from "./RecordItem";
import SteamingItem from "./SteamingItem";
import MyReviewItem from "./MyReviewItem";

// Swiper import
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MyContent3 = () => {
  const recordData = [1, 2, 3, 4];
  const steamingData = [1];
  const reviewData = [1, 2];

  return (
    <section id="mycontent3">
      <div className="inner">
        {/*  영상 시청 기록 */}
        <div className="record">
          <div className="title">
            <h2>영상 시청 기록</h2>
          </div>
          {recordData.length === 0 ? (
            <div className="recordList empty">
              <span>시청 기록이 없습니다.</span>
            </div>
          ) : (
            <div className="recordList hasData">
              <Swiper spaceBetween={18} slidesPerView={3}>
                {recordData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <RecordItem data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/*  영상 찜 목록 */}
        <div className="steaming">
          <div className="title">
            <h2>영상 찜 목록</h2>
          </div>
          {steamingData.length === 0 ? (
            <div className="steamingList empty">
              <span>찜한 영상이 없습니다.</span>
            </div>
          ) : (
            <div className="steamingList hasData">
              <Swiper spaceBetween={18} slidesPerView={3}>
                {steamingData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <SteamingItem data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>

        {/*  내가 쓴 리뷰 */}
        <div className="myReview">
          <div className="title">
            <h2>내가 쓴 리뷰</h2>
          </div>
          {reviewData.length === 0 ? (
            <div className="myReviewList empty">
              <span>작성하신 리뷰가 없습니다.</span>
            </div>
          ) : (
            <div className="myReviewList hasData">
              <Swiper spaceBetween={18} slidesPerView={2}>
                {reviewData.map((item, idx) => (
                  <SwiperSlide key={idx}>
                    <MyReviewItem data={item} />
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default MyContent3;
