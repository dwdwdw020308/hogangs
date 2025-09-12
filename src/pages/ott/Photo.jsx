import { SwiperSlide, Swiper } from 'swiper/react';
import { Grid, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/scrollbar';

const Photo = () => {
    const photo = [
        { id: 1, img: 'detail-photo1-2.png', title: '안녕베일리포토' },
        { id: 2, img: 'detail-photo1-18.png', title: '안녕베일리포토' },
        { id: 3, img: 'detail-photo1-3.png', title: '안녕베일리포토' },
        { id: 4, img: 'detail-photo1-4.png', title: '안녕베일리포토' },
        { id: 5, img: 'detail-photo1-5.png', title: '안녕베일리포토' },
        { id: 6, img: 'detail-photo1-6.png', title: '안녕베일리포토' },
        { id: 7, img: 'detail-photo1-7.png', title: '안녕베일리포토' },
        { id: 8, img: 'detail-photo1-8.png', title: '안녕베일리포토' },
        { id: 9, img: 'detail-photo1-9.png', title: '안녕베일리포토' },
        { id: 10, img: 'detail-photo1-10.png', title: '안녕베일리포토' },
        { id: 11, img: 'detail-photo1-11.png', title: '안녕베일리포토' },
        { id: 12, img: 'detail-photo1-12.png', title: '안녕베일리포토' },
        { id: 13, img: 'detail-photo1-13.png', title: '안녕베일리포토' },
        { id: 14, img: 'detail-photo1-14.png', title: '안녕베일리포토' },
        { id: 15, img: 'detail-photo1-15.png', title: '안녕베일리포토' },
        { id: 16, img: 'detail-photo1-16.png', title: '안녕베일리포토' },
        { id: 17, img: 'detail-photo1-17.png', title: '안녕베일리포토' },
        { id: 18, img: 'detail-photo1-1.png', title: '안녕베일리포토' },
    ];
    return (
        <div className="video-photo">
            <div className="inner">
                <Swiper
                    modules={[Grid, Scrollbar]}
                    grid={{ rows: 3, fill: 'row' }}
                    slidesPerView={3}
                    spaceBetween={20}
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
        </div>
    );
};

export default Photo;
