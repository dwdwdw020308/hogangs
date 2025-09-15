import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';

const Review = () => {
    // 입력되어있는 리뷰 데이터
    const [reviews, setReviews] = useState(() => {
        const saved = localStorage.getItem('reviews');
        return saved
            ? JSON.parse(saved)
            : [
                  {
                      id: 1,
                      name: '해피',
                      text: '따듯하고 가슴 뭉클한 영화였습니다.',
                      score: 4.0,
                      date: '2025-09-11',
                      like: 5,
                      liked: false,
                  },
                  {
                      id: 2,
                      name: '퐁이',
                      text: '영화보고 집에 와서 멍멍이를 꼬옥 안아줬어요 ㅠㅠ',
                      score: 5.0,
                      date: '2025-09-10',
                      like: 6,
                      liked: false,
                  },
                  {
                      id: 3,
                      name: '딸기',
                      text: '강아지들과 함께하기에 우리는 축복받은 존재!',
                      score: 4.0,
                      date: '2025-09-05',
                      like: 7,
                      liked: false,
                  },
                  {
                      id: 4,
                      name: '사랑이',
                      text: '헨리 연기가 부자연스러워 보였어요',
                      score: 2.0,
                      date: '2025-09-01',
                      like: 25,
                      liked: false,
                  },
                  {
                      id: 5,
                      name: '김철수',
                      text: '정말 재미있고 좋아요!',
                      score: 4.0,
                      date: '2025-08-23',
                      like: 1,
                      liked: false,
                  },
                  {
                      id: 6,
                      name: '미미',
                      text: '헨리야... 울다 뿜을뻔 했다..',
                      score: 3.0,
                      date: '2025-08-12',
                      like: 0,
                      liked: false,
                  },
                  {
                      id: 7,
                      name: '방울이',
                      text: '베일리, 베일리, 베일리!',
                      score: 5.0,
                      date: '2025-08-12',
                      like: 5,
                      liked: false,
                  },
                  {
                      id: 8,
                      name: '쪼코',
                      text: '댕댕이들 연기 좋고~헨리 연기 자연스럽더라~',
                      score: 4.0,
                      date: '2025-08-02',
                      like: 4,
                      liked: false,
                  },
                  {
                      id: 9,
                      name: '꼬미',
                      text: '마음이 따뜻해지는 영화.',
                      score: 5.0,
                      date: '2025-07-22',
                      like: 22,
                      liked: false,
                  },
                  {
                      id: 10,
                      name: '둥이',
                      text: '사랑스럽고 귀엽고ㅠ',
                      score: 5.0,
                      date: '2025-07-12',
                      like: 2,
                      liked: false,
                  },
              ];
    });
    const [rating, setRating] = useState(0); // 새로 선택한 별점
    const [hover, setHover] = useState(null); // 호버시 별 색상 변경
    const [text, setText] = useState(''); // 리뷰
    useEffect(() => {
        localStorage.setItem('reviews', JSON.stringify(reviews));
    }, [reviews]);
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length).toFixed(1)
            : 0;
    const onAdd = () => {
        if (!rating || text.trim() === '') {
            alert('별점과 리뷰를 입력해주세요');
            return;
        }
        const newReview = {
            id: Date.now(),
            name: '이름', //나중에 닉네임들어올 예정
            text,
            score: rating,
            date: new Date().toISOString().slice(0, 10),
            like: 0,
            liked: false,
        };
        setReviews([newReview, ...reviews]); //기존 리뷰 앞에 추가
        setRating(0);
        setText('');
    };
    const handleLike = (id) => {
        setReviews(
            reviews.map((review) => {
                // review.id === id ? { ...review, like: review.like + 1 } : review
                if (review.id === id) {
                    if (review.liked) {
                        return { ...review, like: review.like - 1, liked: false };
                    } else {
                        return { ...review, like: review.like + 1, liked: true };
                    }
                }
                return review;
            })
        );
    };
    return (
        <div className="review-wrapper">
            <div className="inner">
                <div className="reveiw-score">
                    {/* 별점 */}
                    <div className="stars-box">
                        <strong>{rating}</strong>
                        <p>별점을 남겨주세요</p>
                        {[...Array(5)].map((_, i) => {
                            const starValue = i + 1;
                            return (
                                <FaStar
                                    key={i}
                                    size={38}
                                    color={starValue <= (hover || rating) ? '#4A9F99' : '#959595'}
                                    onClick={() => setRating(starValue)}
                                    onMouseEnter={() => setHover(starValue)}
                                    onMouseLeave={() => setHover(null)}
                                    style={{ cursor: 'pointer' }}
                                />
                            );
                        })}
                    </div>
                    {/* 평균별점 & 리뷰개수 */}
                    <div className="average">
                        <strong>{averageRating}</strong> <p>{reviews.length}개의 별점</p>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={38}
                                color={i < Math.round(averageRating) ? '#4A9F99' : '#959595'}
                            />
                        ))}
                    </div>

                    <div className="bar">
                        <img src="/ott/bar.png" alt="막대그래프" />
                    </div>
                </div>

                {/* 리뷰작성 */}
                <div className="review-form">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="이 작품에 대한 내 평가를 남겨보세요!"
                        rows="3"
                        style={{ resize: 'none' }}
                    />
                    <button onClick={onAdd} color="red" disabled={!rating || text.trim() === ''}>
                        등록
                    </button>
                </div>
                {/* 리뷰리스트 */}
                <div className="review-list">
                    <strong>리뷰 ({reviews.length})</strong>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-item">
                            {/* <strong>{review.name}</strong> */}
                            {[...Array(5)].map((_, i) => (
                                <FaStar
                                    key={i}
                                    size={24}
                                    color={i < review.score ? '#4A9F99' : '#959595'}
                                />
                            ))}
                            <span className="score-length">{review.score}</span>
                            <span className="date">{review.date}</span>
                            <p>{review.text}</p>
                            <button onClick={() => handleLike(review.id)}>
                                <AiFillLike
                                    size={20}
                                    color={review.liked ? '#4A9F99' : '#959595'}
                                />
                                {review.like}
                            </button>
                            <button className="more">
                                <FiMoreVertical />
                            </button>
                            <div className="line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;
