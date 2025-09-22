// 영화 상세페이지 연관내용

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Relate = ({ videolist, person }) => {
    return (
        <div className="detail-relate">
            <strong>고객들이 시청한 다른 작품</strong>
            <p className="more">
                <span>+</span> 더보기
            </p>
            <Swiper slidesPerView={4.5} loop={false} spaceBetween={14}>
                {videolist.map((videolist) => (
                    <SwiperSlide key={videolist.id}>
                        <div className="poster-list">
                            <img src={videolist.img} alt={videolist.title} />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <em>감독/출연</em>
            <ul className="list">
                {person.map((person) => (
                    <li key={person.id}>
                        <img src={person.img} alt={person.name} />
                        <div className="info">
                            <p className="name">{person.name}</p>
                            <p className="type">{person.type}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Relate;
