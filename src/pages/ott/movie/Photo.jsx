// 영화 상세페이지 포토
import { SwiperSlide, Swiper } from 'swiper/react';
import { Grid, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/scrollbar';

const Photo = ({ photo }) => {
    return (
        <div className="video-photo">
            <Swiper
                modules={[Grid, Scrollbar]}
                grid={{ rows: 3, fill: 'row' }}
                slidesPerView={3}
                spaceBetween={20}
                slidesPerGroup={3}
                // loop={false}
                scrollbar={{ hide: false, draggable: true }}
                breakpoints={{
                    0: {
                        // 모바일 (0px ~ 600px)
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                        spaceBetween: 6, // 간격 좁게'
                        grid: { rows: 5, fill: 'row' },
                    },
                    601: {
                        // 태블릿 이상
                        slidesPerView: 3,
                        slidesPerGroup: 3,
                        spaceBetween: 15,
                    },
                }}
            >
                {photo.map((photo) => (
                    <SwiperSlide>
                        <img src={photo.img} alt={photo.title} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Photo;
