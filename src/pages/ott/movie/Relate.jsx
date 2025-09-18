import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';


const Relate = () => {
    const videolist = [
        { id: 1, img: '/ott/detail-thumb9.png', title: '말리와 나' },
        { id: 2, img: '/ott/detail-thumb2.png', title: '콜 오브 와일드' },
        { id: 3, img: '/ott/detail-thumb3.png', title: '마리강아지와 아이들' },
        { id: 4, img: '/ott/detail-thumb4.png', title: '레이싱 인더 레인' },
        { id: 5, img: '/ott/detail-thumb5.png', title: '더 웨이 홈' },
        { id: 6, img: '/ott/detail-thumb6.png', title: '도그' },
        { id: 7, img: '/ott/detail-thumb7.png', title: 'TOGO' },
        { id: 8, img: '/ott/detail-thumb8.png', title: '볼트' },
    ];
    const person = [
        { id: 1, img: '/ott/person1.png', name: '게일 맨쿠소', type: '감독' },
        { id: 2, img: '/ott/person2.png', name: '애비 라이더 포트슨', type: '주연 • 어린 씨제이' },
        { id: 3, img: '/ott/person3.png', name: '헨리', type: '조연 • 트렌트' },
        { id: 4, img: '/ott/person4.png', name: '데니스 퀘이드', type: '주연 • 이든' },
        { id: 5, img: '/ott/person5.png', name: '조시 게드', type: '주연 • 베일리' },
        { id: 6, img: '/ott/person6.png', name: '캐서린 프레스콧', type: '조연 • 씨제이' },
        { id: 7, img: '/ott/person7.png', name: '베티 길핀', type: '조연 • 글로리아' },
        { id: 8, img: '/ott/person8.png', name: '마그 헨젤버거', type: '조연 • 한나' },
    ];

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
