import { Swiper, SwiperSlide } from "swiper/react"; // Swiper 컴포넌트
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // 모듈들 import

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const HotelIntroduceSwiper = () => {
  return (
    <Swiper
      className="hotel_introduce_swiper"
      modules={[Autoplay]}
      slidesPerView="auto" // 슬라이드 너비는 CSS에서 고정
      spaceBetween={64} // ✅ gap 대신 Swiper 옵션으로
      centeredSlides={true} // ✅ 가운데 슬라이드가 활성
      loop={true}
      loopAdditionalSlides={1} // 소수 슬라이드에서 루프 끊김 방지
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      speed={600}
    >
      <SwiperSlide>
        <div className="slide_inner">
          <div className="top">
            <div className="title">다양한 미용 서비스</div>
            <strong>목욕 그 이상 풀케어 서비스!</strong>
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default HotelIntroduceSwiper;
