import React from 'react';

const MyReviewItem = ({ data }) => {
    return (
        <div className="myReviewItem" id="myReviewItem">
            <h3>영화 제목</h3>
            <div className="star">
                <div className="starImg">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="16"
                            viewBox="0 0 18 16"
                            fill="none"
                        >
                            <path
                                d="M3.85156 16.0013L5.20573 10.1471L0.664062 6.20964L6.66406 5.6888L8.9974 0.167969L11.3307 5.6888L17.3307 6.20964L12.7891 10.1471L14.1432 16.0013L8.9974 12.8971L3.85156 16.0013Z"
                                fill={i < 2 ? '#4A9F99' : '#B6B6B6'}
                            />
                        </svg>
                    ))}
                </div>

                <p>2.0</p>
            </div>
            <div className="date">
                <p>2025-09-20</p>
            </div>
            <div className="content">
                <p>
                    내용내용내용내용내내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
                </p>
            </div>
        </div>
    );
};

export default MyReviewItem;
