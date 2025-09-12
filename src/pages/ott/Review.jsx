import { useState } from 'react';

const Review = () => {
    // 입력되어있는 리뷰 데이터
    const [reviews, setReviews] = useState([
        {
            id: 1,
            name: '해피',
            text: '따듯하고 가슴 뭉클한 영화였습니다.',
            score: 4,
            date: '2025-09-11',
            like: 5,
        },
        {
            id: 2,
            name: '퐁이',
            text: '영화보고 집에 와서 멍멍이를 꼬옥 안아줬어요 ㅠㅠ',
            score: 5,
            date: '2025-09-10',
            like: 6,
        },
        {
            id: 3,
            name: '딸기',
            text: '강아지들과 함께하기에 우리는 축복받은 존재!',
            score: 4,
            date: '2025-09-05',
            like: 7,
        },
        {
            id: 4,
            name: '사랑이',
            text: '헨리 연기가 부자연스러워 보였어요',
            score: 2,
            date: '2025-09-01',
            like: 25,
        },
        {
            id: 5,
            name: '김철수',
            text: '정말 재미있고 좋아요!',
            score: 4,
            date: '2025-08-23',
            like: 1,
        },
        {
            id: 6,
            name: '미미',
            text: '헨리야... 울다 뿜을뻔 했다..',
            score: 3,
            date: '2025-08-12',
            like: 0,
        },
        {
            id: 7,
            name: '방울이',
            text: '베일리, 베일리, 베일리!',
            score: 5,
            date: '2025-08-12',
            like: 5,
        },
        {
            id: 8,
            name: '쪼코',
            text: '댕댕이들 연기 좋고~헨리 연기 자연스럽더라~',
            score: 4,
            date: '2025-08-02',
            like: 4,
        },
        {
            id: 9,
            name: '꼬미',
            text: '마음이 따뜻해지는 영화.',
            score: 5,
            date: '2025-07-22',
            like: 22,
        },
        {
            id: 10,
            name: '둥이',
            text: '사랑스럽고 귀엽고ㅠ',
            score: 5,
            date: '2025-07-12',
            like: 2,
        },
    ]);
    const [rating, setRating] = useState(0); // 새로 선택한 별점
    const [hover, setHover] = useState(null); // 호버시 별 색상 변경
    const [text, setText] = useState(''); // 리뷰
    const averageRating =
        reviews.length > 0
            ? (reviews.reduce((sum, review) => sum + review, 0) / reviews.length).toFixed(1)
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
        };
        setReviews([newReview, ...reviews]); //기존 리뷰 앞에 추가
        setRating(0);
        setText('');
    };
    return (
        <div>
            <div className="inner">리뷰</div>
        </div>
    );
};

export default Review;
