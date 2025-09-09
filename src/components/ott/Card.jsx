import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Card = () => {
    const [flip, setFlip] = useState({});
    // const [swiperInstance, setSwiperInstance] = useState(null);
    const toggleFlip = (id) => {
        setFlip((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };
    const cards = [
        { id: 1, front: '/ott/card-front1.png', back: '/ott/card-back1.png' },
        { id: 2, front: '/ott/card-front2.png', back: '/ott/card-back2.png' },
        { id: 3, front: '/ott/card-front3.png', back: '/ott/card-back3.png' },
    ];

    return (
        <div className="card">
            <strong>
                오늘 <span>뭐</span>볼까?
            </strong>
            <p>쉿! 카드 뒤에 호강이 PICK 영상이 숨어있어요!</p>
            <Swiper
                modules={[Navigation]}
                slidesPerView={3}
                spaceBetween={30}
                slidesPerGroup={1}
                loop={true}
            >
                {cards.map((card) => (
                    <SwiperSlide key={card.id}>
                        <ReactCardFlip isFlipped={flip[card.id]} flipDirection="horizontal">
                            <div
                                className="card-front"
                                onClick={() => toggleFlip(card.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={card.front} alt="앞면이미지" />
                            </div>
                            {/* 앞 */}
                            <div
                                className="card-back"
                                onClick={() => toggleFlip(card.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={card.back} alt="뒷면이미지" />
                            </div>
                            {/* 뒤 */}
                        </ReactCardFlip>
                        {/* 프레임 */}
                    </SwiperSlide>
                ))}
            </Swiper>
            <p className="desc">
                * 카드를 <span>클릭</span>해 보세요, 카드 뒷면이 보여요!
            </p>
        </div>
    );
};

export default Card;
