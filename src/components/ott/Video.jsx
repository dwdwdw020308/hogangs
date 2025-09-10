import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';

const Video = () => {
    const video = [
        { id: 1, img: '/ott/youtube1.png', title: '반려견을 위한 3시간 힐링음악' },
        { id: 2, img: '/ott/youtube2.png', title: '오지마을 집착견 사랑이' },
        { id: 3, img: '/ott/youtube3.png', title: '휴지벽에 도전하는 강아지' },
        { id: 4, img: '/ott/youtube4.png', title: '나 우울해서 파마했어 ASMR' },
        { id: 5, img: '/ott/youtube5.png', title: '리드 줄, 앉아, 기다려' },
        {
            id: 6,
            img: '/ott/youtube6.png',
            title: '강아지 김밥 하나 고남미 김밥 하나 포장해주세요',
        },
        { id: 7, img: '/ott/youtube7.png', title: '마라탕 같이 먹었어요' },
    ];

    return (
        <div className="youtube">
            <strong>
                오늘의 <span>댕댕이 TV</span>
            </strong>
            <Swiper
                modules={[Scrollbar]}
                // pagination={{ clickable: true }}
                slidesPerView="auto"
                // slidesPerGroup={20}
                spaceBetween={26}
                loop={false}
                scrollbar={{ hide: false, draggable: true }}
            >
                {video.map((video) => (
                    <SwiperSlide key={video.id} style={{ width: 480 }}>
                        <div className="slide-card">
                            <img src={video.img} alt={video.title} />
                            <p>{video.title}</p>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default Video;
