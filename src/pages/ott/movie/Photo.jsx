// 영화 상세페이지 포토
import { SwiperSlide, Swiper } from 'swiper/react';
import { Grid, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/scrollbar';

const Photo = ({ photo }) => {
    // const photo = [
    //     { id: 1, img: '/ott/detail-photo1-2.png', title: '안녕베일리포토' },
    //     { id: 2, img: '/ott/detail-photo1-18.png', title: '안녕베일리포토' },
    //     { id: 3, img: '/ott/detail-photo1-3.png', title: '안녕베일리포토' },
    //     { id: 4, img: '/ott/detail-photo1-4.png', title: '안녕베일리포토' },
    //     { id: 5, img: '/ott/detail-photo1-5.png', title: '안녕베일리포토' },
    //     { id: 6, img: '/ott/detail-photo1-6.png', title: '안녕베일리포토' },
    //     { id: 7, img: '/ott/detail-photo1-7.png', title: '안녕베일리포토' },
    //     { id: 8, img: '/ott/detail-photo1-8.png', title: '안녕베일리포토' },
    //     { id: 9, img: '/ott/detail-photo1-9.png', title: '안녕베일리포토' },
    //     { id: 10, img: '/ott/detail-photo1-10.png', title: '안녕베일리포토' },
    //     { id: 11, img: '/ott/detail-photo1-11.png', title: '안녕베일리포토' },
    //     { id: 12, img: '/ott/detail-photo1-12.png', title: '안녕베일리포토' },
    //     { id: 13, img: '/ott/detail-photo1-13.png', title: '안녕베일리포토' },
    //     { id: 14, img: '/ott/detail-photo1-14.png', title: '안녕베일리포토' },
    //     { id: 15, img: '/ott/detail-photo1-15.png', title: '안녕베일리포토' },
    //     { id: 16, img: '/ott/detail-photo1-16.png', title: '안녕베일리포토' },
    //     { id: 17, img: '/ott/detail-photo1-17.png', title: '안녕베일리포토' },
    //     { id: 18, img: '/ott/detail-photo1-1.png', title: '안녕베일리포토' },
    // ];
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
