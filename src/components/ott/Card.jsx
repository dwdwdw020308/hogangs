import { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { useNavigate } from 'react-router-dom';

const cards = [
    { id: 1, front: '/ott/card-front1.png', back: '/ott/card-back1.png' },
    { id: 2, front: '/ott/card-front2.png', back: '/ott/card-back2.png' },
    { id: 3, front: '/ott/card-front3.png', back: '/ott/card-back3.png' },
    { id: 4, front: '/ott/card-front4.png', back: '/ott/card-back4.png' },
    { id: 5, front: '/ott/card-front5.png', back: '/ott/card-back5.png' },
];

const Card = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [flip, setFlip] = useState({});
    const navigate = useNavigate();

    const toggleFlip = (id, index) => {
        if (index !== currentIndex) return;
        setFlip((prev) => ({
            ...prev,
            [id]: !prev[id],
        }));
    };

    const getClassName = (index) => {
        if (index === currentIndex) return 'card-wrap center';
        if (index === (currentIndex - 1 + cards.length) % cards.length) return 'card-wrap left-1';
        if (index === (currentIndex - 2 + cards.length) % cards.length) return 'card-wrap left-2';
        if (index === (currentIndex + 1) % cards.length) return 'card-wrap right-1';
        if (index === (currentIndex + 2) % cards.length) return 'card-wrap right-2';
        return 'card-wrap hidden';
    };

    const handlePrev = () => {
        setCurrentIndex((prev) => (prev - 1 + cards.length) % cards.length);
    };

    const handleNext = () => {
        setCurrentIndex((prev) => (prev + 1) % cards.length);
    };

    return (
        <div className="card">
            <strong>
                우리의 오늘을 특별하게 <span>호강스 pick !</span>
            </strong>
            <p>쉿! 카드 뒤에 호강이 PICK 영상이 숨어있어요!</p>
            <img
                src="/ott/button_prev.svg"
                alt=""
                className="nav-arrow left"
                onClick={handlePrev}
            />

            <div className="carousel-track">
                {cards.map((card, index) => (
                    <div key={card.id} className={getClassName(index)}>
                        <ReactCardFlip isFlipped={flip[card.id]} flipDirection="horizontal">
                            {/* 앞면 */}
                            <div
                                className="card-front"
                                onClick={() => toggleFlip(card.id, index)}
                                style={{ cursor: index === currentIndex ? 'pointer' : 'default' }}
                            >
                                <img src={card.front} alt={`카드 ${card.id} 앞면`} />
                            </div>

                            {/* 뒷면 */}
                            <div
                                className="card-back"
                                onClick={() => toggleFlip(card.id, index)}
                                style={{ cursor: 'pointer' }}
                            >
                                <img src={card.back} alt={`카드 ${card.id} 뒷면`} />
                                <button onClick={() => navigate(`/video/movie/${card.id}`)}>
                                    <span>지금보러가기</span> <img src="/ott/icon-paw.png" alt="" />
                                </button>
                            </div>
                        </ReactCardFlip>
                    </div>
                ))}
            </div>

            <img
                src="/ott/button_next.svg"
                alt=""
                className="nav-arrow right"
                onClick={handleNext}
            />
            <p className="desc">
                <img src="/ott/icon-bone.svg" alt="뼈다귀아이콘" />
                클릭해보개, 카드의 뒷면이 있다구! 멍멍!
            </p>
        </div>
    );
};

export default Card;
