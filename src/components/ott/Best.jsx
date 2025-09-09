import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { PiArrowCircleLeftThin, PiArrowCircleRightThin } from 'react-icons/pi';
import 'swiper/css';
import 'swiper/css/navigation';

const Best = () => {
    const best5 = [
        {
            id: 1,
            img: '/ott/movie6.png',
            title: '도그',
            desc: '말썽꾸러기 도그와 함께 떠나는 엉뚱하고 따뜻한 힐링 로드트립',
            date: '2022',
        },
        {
            id: 2,
            img: '/ott/movie8.png',
            title: '더 웨이 홈',
            desc: '집으로 돌아가기 위한 강아지의 감동 여정을 담은 이야기',
            date: '2019',
        },
        {
            id: 3,
            img: '/ott/movie9.png',
            title: '안녕 베일리',
            desc: '환생을 통해 반려인 곁을 지키는 충직하고 사랑스러운 강아지 이야기',
            date: '2019',
        },
        {
            id: 4,
            img: '/ott/movie2.png',
            title: '마리와 강아지 이야기',
            desc: '재해 속에서 주인과 다시 만나기 위해 애쓰는 아기 강아지들의 감동 실화',
            date: '2007',
        },
        {
            id: 5,
            img: '/ott/movie1.png',
            title: '말리와 나',
            desc: '천방지축 강아지 말리와 펼치는 유쾌하고 사랑스러운 가족 이야기',
            date: '2008',
        },
    ];
    const [activeIndex, setActiveIndex] = useState(0);
    const current = best5[activeIndex];
    return (
        <div className="best-movie">
            {/* 왼쪽 텍스트*/}
            <div className="left">
                <strong>인기 영화 TOP 5</strong>
                <h2>{best5.title}</h2>
                <p>{best5.desc}</p>
                <p className="bg">
                    BEST <br />
                    MOVIE
                </p>
            </div>
            {/* 오른쪽 이미지 */}
            <div className="right">
                <Swiper
                    modules={[Navigation]}
                    navigation={{
                        nextEl: '.best-custom-next',
                        prevEl: '.best-custom-prev',
                    }}
                    slidesPerView="auto"
                    spaceBetween={20}
                    loop={true}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                >
                    {best5.map((best5) => (
                        <SwiperSlide key={best5.id}>
                            <div className="poster">
                                <img src={best5.img} alt={best5.title} />
                                <p>
                                    {best5.title} {best5.date}
                                </p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className="btn">
                <PiArrowCircleLeftThin className="best-custom-prev" size={42} />
                <PiArrowCircleRightThin className="best-custom-next" size={42} />
            </div>
        </div>
    );
};

export default Best;
