import { useState } from 'react';
import {
    PiArrowCircleLeftThin,
    PiArrowCircleRightThin,
    PiCaretCircleRightThin,
    PiCaretCircleLeftThin,
} from 'react-icons/pi';

const Best = () => {
    const best5 = [
        {
            id: 1,
            img: '/ott/movie6.png',
            title: '도그',
            desc: '말썽꾸러기 도그와 함께 떠나는 \n 엉뚱하고 따뜻한 힐링 로드트립',
            date: '2022',
        },
        {
            id: 2,
            img: '/ott/movie8.png',
            title: '더 웨이 홈',
            desc: '집으로 돌아가기 위한 강아지의 \n 감동 여정을 담은 이야기',
            date: '2019',
        },
        {
            id: 3,
            img: '/ott/movie9.png',
            title: '안녕 베일리',
            desc: '환생을 통해 반려인 곁을 지키는 \n충직하고 사랑스러운 강아지 이야기',
            date: '2019',
        },
        {
            id: 4,
            img: '/ott/movie2.png',
            title: '마리와 강아지 이야기',
            desc: '재해 속에서 주인과 다시 만나기 위해 \n 애쓰는 아기 강아지들의 감동 실화',
            date: '2007',
        },
        {
            id: 5,
            img: '/ott/movie1.png',
            title: '말리와 나',
            desc: '천방지축 강아지 말리와 함께 \n 유쾌하고 사랑스러운 가족 이야기',
            date: '2008',
        },
    ];

    const [movies, setMovies] = useState(best5);
    const [currentIndex, setCurrentIndex] = useState(0);

    //버튼 호버했을때
    const [hoverLeft, setHoverLeft] = useState(false);
    const [hoverRight, setHoverRight] = useState(false);

    const handleNext = () => {
        setMovies((prev) => {
            const [first, ...rest] = prev;
            return [...rest, first];
        });
        setCurrentIndex((prev) => (prev + 1) % best5.length);
    };

    const handlePrev = () => {
        setMovies((prev) => {
            const last = prev[prev.length - 1];
            return [last, ...prev.slice(0, prev.length - 1)];
        });
        setCurrentIndex((prev) => (prev - 1 + best5.length) % best5.length);
    };

    return (
        <div className="best-movie">
            {/* 왼쪽 텍스트 */}
            <div className="left">
                <strong>인기 영화 TOP 5</strong>
                <h2>{movies[0].title}</h2>
                <p>{movies[0].desc}</p>
            </div>

            {/* 오른쪽 이미지 */}
            <div className="right">
                <div className="slide-wrapper">
                    {movies.slice(0, 4).map((movie, idx) => (
                        <div
                            className={`poster ${idx === 0 ? 'active' : 'inactive'}`}
                            key={movie.id}
                        >
                            <img src={movie.img} alt={movie.title} draggable={false} />
                            <p className="title">{movie.title}</p>
                            <span className="date">{movie.date}</span>
                            <div className="btn">
                                <p>지금보러가기</p>
                            </div>
                        </div>
                    ))}
                </div>
                {/* 버튼 */}
                <div className="btns">
                    <button
                        className="icon-btn"
                        onMouseEnter={() => setHoverLeft(true)}
                        onMouseLeave={() => setHoverLeft(false)}
                        onClick={handlePrev}
                    >
                        <span className={`icon ${hoverLeft ? 'hide' : 'show'}`}>
                            <PiArrowCircleLeftThin />
                        </span>
                        <span className={`icon ${hoverLeft ? 'show' : 'hide'}`}>
                            <PiCaretCircleLeftThin />
                        </span>
                    </button>

                    <button
                        className="icon-btn"
                        onMouseEnter={() => setHoverRight(true)}
                        onMouseLeave={() => setHoverRight(false)}
                        onClick={handleNext}
                    >
                        <span className={`icon ${hoverRight ? 'hide' : 'show'}`}>
                            <PiArrowCircleRightThin />
                        </span>
                        <span className={`icon ${hoverRight ? 'show' : 'hide'}`}>
                            <PiCaretCircleRightThin />
                        </span>
                    </button>
                </div>
                {/* 짧은 진행률 */}
                <div className="progress">
                    <div
                        className="bar"
                        style={{
                            width: `${(3 / best5.length) * 100}%`,
                            // width: '400px',
                            transform: `translateX(${(currentIndex / best5.length) * 100}%)`,
                        }}
                    ></div>
                </div>
            </div>
        </div>
    );
};

export default Best;
