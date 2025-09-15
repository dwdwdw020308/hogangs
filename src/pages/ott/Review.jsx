import { useEffect, useState } from 'react';
import { FaStar } from 'react-icons/fa';
import { FiMoreVertical } from 'react-icons/fi';
import { AiFillLike } from 'react-icons/ai';

// ✅ 기본 목업 데이터
const defaultReviews = [
    {
        id: 1,
        text: '따듯하고 가슴 뭉클한 영화였습니다.',
        score: 4.0,
        date: '2025-09-11',
        like: 5,
        liked: false,
        isDefault: true,
    },
    {
        id: 2,
        text: '영화보고 집에 와서 멍멍이를 꼬옥 안아줬어요 ㅠㅠ',
        score: 5.0,
        date: '2025-09-10',
        like: 6,
        liked: false,
        isDefault: true,
    },
    {
        id: 3,
        text: '강아지들과 함께하기에 우리는 축복받은 존재!',
        score: 4.0,
        date: '2025-09-05',
        like: 7,
        liked: false,
        isDefault: true,
    },
    {
        id: 4,
        text: '헨리 연기가 부자연스러워 보였어요',
        score: 2.0,
        date: '2025-09-01',
        like: 25,
        liked: false,
        isDefault: true,
    },
    {
        id: 5,
        text: '정말 재미있고 좋아요!',
        score: 4.0,
        date: '2025-08-23',
        like: 1,
        liked: false,
        isDefault: true,
    },
    {
        id: 6,
        text: '헨리야... 울다 뿜을뻔 했다..',
        score: 3.0,
        date: '2025-08-12',
        like: 0,
        liked: false,
        isDefault: true,
    },
    {
        id: 7,
        text: '베일리, 베일리, 베일리!',
        score: 5.0,
        date: '2025-08-12',
        like: 5,
        liked: false,
        isDefault: true,
    },
    {
        id: 8,
        text: '댕댕이들 연기 좋고~헨리 연기 자연스럽더라~',
        score: 4.0,
        date: '2025-08-02',
        like: 4,
        liked: false,
        isDefault: true,
    },
    {
        id: 9,
        text: '마음이 따뜻해지는 영화.',
        score: 5.0,
        date: '2025-07-22',
        like: 22,
        liked: false,
        isDefault: true,
    },
    {
        id: 10,
        text: '사랑스럽고 귀엽고ㅠ',
        score: 5.0,
        date: '2025-07-12',
        like: 2,
        liked: false,
        isDefault: true,
    },
];

const Review = () => {
    // ✅ 초기화: 기본 리뷰 + 저장된 내 리뷰 합치기
    const [reviews, setReviews] = useState(() => {
        const saved = JSON.parse(localStorage.getItem('reviews')) || [];
        return [...defaultReviews, ...saved];
    });

    // 드롭다운
    const [openDropDown, setOpenDropDown] = useState(null);
    const toggleDropDown = (id) => {
        setOpenDropDown(openDropDown === id ? null : id);
    };

    // 입력 상태
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(null);
    const [text, setText] = useState('');

    // 수정 상태
    const [editingId, setEditingId] = useState(null);

    // ✅ 로컬스토리지에는 내가 쓴 리뷰만 저장
    useEffect(() => {
        const userReviews = reviews.filter((r) => !r.isDefault);
        localStorage.setItem('reviews', JSON.stringify(userReviews));
    }, [reviews]);

    // 평균 별점
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review.score, 0) / reviews.length).toFixed(1)
            : 0;

    // 등록
    const onAdd = () => {
        if (!rating || text.trim() === '') {
            alert('별점과 리뷰를 입력해주세요');
            return;
        }
        const newReview = {
            id: Date.now(),
            text,
            score: rating,
            date: new Date().toISOString().slice(0, 10),
            like: 0,
            liked: false,
            isDefault: false,
        };
        setReviews([newReview, ...reviews]);
        setRating(0);
        setText('');
    };

    // 삭제
    const onDel = (id) => {
        setReviews(reviews.filter((review) => review.id !== id));
    };

    // 수정 시작
    const onEdit = (id, text, score) => {
        setEditingId(id);
        setText(text);
        setRating(score);
    };

    // 수정 완료
    const onSave = () => {
        setReviews(
            reviews.map((review) =>
                review.id === editingId ? { ...review, text, score: rating } : review
            )
        );
        setEditingId(null);
        setText('');
        setRating(0);
    };

    // 좋아요
    const handleLike = (id) => {
        setReviews(
            reviews.map((review) =>
                review.id === id
                    ? {
                          ...review,
                          like: review.liked ? review.like - 1 : review.like + 1,
                          liked: !review.liked,
                      }
                    : review
            )
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
                    {/* 평균 별점 */}
                    <div className="average">
                        <strong>{averageRating}</strong>
                        <p>{reviews.length}개의 별점</p>
                        {[...Array(5)].map((_, i) => (
                            <FaStar
                                key={i}
                                size={38}
                                color={i < Math.round(averageRating) ? '#4A9F99' : '#959595'}
                            />
                        ))}
                    </div>
                    <div className="bar">
                        <img src="/ott/bar.png" alt="" />
                    </div>
                </div>

                {/* 리뷰 작성/수정 폼 */}
                <div className="review-form">
                    <textarea
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="이 작품에 대한 내 평가를 남겨보세요!"
                        rows="3"
                        style={{ resize: 'none' }}
                    />
                    {editingId ? (
                        <button onClick={onSave}>수정완료</button>
                    ) : (
                        <button onClick={onAdd} disabled={!rating || text.trim() === ''}>
                            등록
                        </button>
                    )}
                </div>

                {/* 리뷰 리스트 */}
                <div className="review-list">
                    <strong>리뷰 ({reviews.length})</strong>
                    {reviews.map((review) => (
                        <div key={review.id} className="review-item">
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
                                <span>{review.like}</span>
                            </button>
                            <div className="more">
                                <button onClick={() => toggleDropDown(review.id)}>
                                    <FiMoreVertical />
                                </button>
                                {openDropDown === review.id && (
                                    <ul className="dropdown" onClick={() => setOpenDropDown(null)}>
                                        {review.isDefault ? (
                                            <>
                                                <li>스포일러로 신고</li>
                                                <li>부적절한 표현으로 신고</li>
                                            </>
                                        ) : (
                                            <>
                                                <li
                                                    onClick={() =>
                                                        onEdit(review.id, review.text, review.score)
                                                    }
                                                >
                                                    수정
                                                </li>
                                                <li onClick={() => onDel(review.id)}>삭제</li>
                                            </>
                                        )}
                                    </ul>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Review;
