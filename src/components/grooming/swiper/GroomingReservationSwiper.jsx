import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { getWeekDays, getWeekStartsOfMonth } from "../../../utils/Date";
import CurrentReservation from "./content/CurrentReservation";

const GroomingReservationSwiper = ({
  monthDate = new Date(),
  weekStartsOn = 0,
}) => {
  const today = new Date(); // 렌더 시점 한 번만 캡처
  const weekStarts = getWeekStartsOfMonth(monthDate, today, weekStartsOn);
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        className="grooming_reservation_swiper"
        // modules={[Navigation]}
        // navigation
        slidesPerView={1}
        loop={false}
        onSwiper={(sw) => (swiperRef.current = sw)}
      >
        {weekStarts.map((weekStart) => {
          const days = getWeekDays(weekStart, 0, weekStartsOn); // 해당 주 7일
          return (
            <SwiperSlide key={weekStart.toISOString()}>
              <ul className="list">
                {days.map((d) => (
                  <CurrentReservation key={d.toISOString()} day={d} />
                ))}
              </ul>
            </SwiperSlide>
          );
        })}
      </Swiper>
      <div className="prev" onClick={() => swiperRef.current?.slidePrev()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M11.4686 9.38541C11.6066 9.23731 11.6817 9.04143 11.6781 8.83903C11.6746 8.63664 11.5926 8.44353 11.4494 8.30039C11.3063 8.15725 11.1132 8.07526 10.9108 8.07169C10.7084 8.06811 10.5125 8.14324 10.3644 8.28124L6.19775 12.4479C6.05145 12.5944 5.96928 12.793 5.96928 13C5.96928 13.207 6.05145 13.4056 6.19775 13.5521L10.3644 17.7187C10.4359 17.7955 10.5222 17.8571 10.618 17.8998C10.7139 17.9425 10.8173 17.9654 10.9222 17.9673C11.0271 17.9691 11.1313 17.9498 11.2286 17.9105C11.3259 17.8712 11.4142 17.8128 11.4884 17.7386C11.5626 17.6644 11.6211 17.576 11.6604 17.4787C11.6997 17.3815 11.719 17.2773 11.7171 17.1724C11.7153 17.0675 11.6923 16.964 11.6496 16.8682C11.6069 16.7723 11.5453 16.6861 11.4686 16.6146L8.63525 13.7812H18.729C18.9362 13.7812 19.1349 13.6989 19.2814 13.5524C19.4279 13.4059 19.5103 13.2072 19.5103 13C19.5103 12.7928 19.4279 12.5941 19.2814 12.4476C19.1349 12.3011 18.9362 12.2187 18.729 12.2187H8.63525L11.4686 9.38541Z"
            fill="#959595"
          />
        </svg>
      </div>
      <div className="next" onClick={() => swiperRef.current?.slideNext()}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
        >
          <path
            d="M14.5314 9.38541C14.3934 9.23731 14.3183 9.04143 14.3219 8.83903C14.3254 8.63664 14.4074 8.44353 14.5506 8.30039C14.6937 8.15725 14.8868 8.07526 15.0892 8.07169C15.2916 8.06811 15.4875 8.14324 15.6356 8.28124L19.8022 12.4479C19.9485 12.5944 20.0307 12.793 20.0307 13C20.0307 13.207 19.9485 13.4056 19.8022 13.5521L15.6356 17.7187C15.5641 17.7955 15.4778 17.8571 15.382 17.8998C15.2861 17.9425 15.1827 17.9654 15.0778 17.9673C14.9729 17.9691 14.8687 17.9498 14.7714 17.9105C14.6741 17.8712 14.5858 17.8128 14.5116 17.7386C14.4374 17.6644 14.3789 17.576 14.3396 17.4787C14.3003 17.3815 14.281 17.2773 14.2829 17.1724C14.2847 17.0675 14.3077 16.964 14.3504 16.8682C14.3931 16.7723 14.4547 16.6861 14.5314 16.6146L17.3647 13.7812H7.271C7.0638 13.7812 6.86508 13.6989 6.71857 13.5524C6.57206 13.4059 6.48975 13.2072 6.48975 13C6.48975 12.7928 6.57206 12.5941 6.71857 12.4476C6.86508 12.3011 7.0638 12.2187 7.271 12.2187H17.3647L14.5314 9.38541Z"
            fill="#959595"
          />
        </svg>
      </div>
    </>
  );
};

export default GroomingReservationSwiper;
