import React from 'react';
import RecordItem from './RecordItem';
import SteamingItem from './SteamingItem';
import MyReviewItem from './MyReviewItem';

const MyContent3 = () => {
    return (
        <section id="mycontent3">
            <div className="inner">
                <div className="record">
                    <div className="title">
                        <h2>영상 시청 기록</h2>
                    </div>
                    {/* <div className="recordList empty">
                        <span>시청 기록이 없습니다.</span>
                    </div> */}
                    <div className="recordList hasData">
                        <RecordItem />
                        <RecordItem />
                        <RecordItem />
                        <RecordItem />
                    </div>
                </div>
                <div className="steaming">
                    <div className="title">
                        <h2>영상 찜 목록</h2>
                    </div>
                    {/* <div className="steamingList empty">
                        <span>찜한 영상이 없습니다.</span>
                    </div> */}
                    <div className="steamingList hasData">
                        <SteamingItem />
                        <SteamingItem />
                        <SteamingItem />
                        <SteamingItem />
                    </div>
                </div>
                <div className="myReview">
                    <div className="title">
                        <h2>내가 쓴 리뷰</h2>
                    </div>
                    {/* <div className="myReviewList empty">
                        <span>찜한 영상이 없습니다.</span>
                    </div> */}
                    <div className="myReviewList hasData">
                        <MyReviewItem />
                        <MyReviewItem />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MyContent3;
