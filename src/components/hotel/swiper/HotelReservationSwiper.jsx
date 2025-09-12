import { useRef } from 'react';

import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import Content from '../section/Content';
import { getWeekDays, getWeekStartsOfMonth } from '../../../utils/Date';
import { Swiper, SwiperSlide } from 'swiper/react';

const HotelReservationSwiper = ({ monthDate = new Date(), weekStartsOn = 0 }) => {
    const today = new Date(); // 렌더 시점 한 번만 캡처
    const weekStarts = getWeekStartsOfMonth(monthDate, today, weekStartsOn);

    return (
        <>
            <Swiper
                className="hotel_reservation_swiper"
                modules={[Navigation]}
                navigation
                slidesPerView={1}
                loop={false}
            >
                {weekStarts.map((weekStart) => {
                    const days = getWeekDays(weekStart, 0, weekStartsOn); // 해당 주 7일
                    return (
                        <SwiperSlide key={weekStart.toISOString()}>
                            <ul className="list">
                                {days.map((d) => (
                                    <Content key={d.toISOString()} day={d} />
                                ))}
                            </ul>
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </>
    );
};

export default HotelReservationSwiper;
