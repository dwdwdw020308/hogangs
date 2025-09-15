import React, { useState } from 'react';
import MyContent1 from '../../components/mypage/content1/MyContent1';
import MyContent2 from '../../components/mypage/content2/MyContent2';
import MyContent3 from '../../components/mypage/content3/MyContent3';

const mypage = () => {
    const [activeTab, setActiveTab] = useState('content1');
    return (
        <div className="myPage" id="myPage">
            <div className="topheader">
                <div className="topName">
                    <img src="/mypage/hogangImg.png" alt="" />
                    <p>호강이님</p>
                </div>
                <div className="nav">
                    <ul>
                        <li
                            className={activeTab === 'content1' ? 'active' : ''}
                            onClick={() => setActiveTab('content1')}
                        >
                            MyPage
                        </li>
                    </ul>
                    <ul>
                        <li
                            className={activeTab === 'content2' ? 'active' : ''}
                            onClick={() => setActiveTab('content2')}
                        >
                            HotelㆍGrooming
                        </li>
                    </ul>
                    <ul>
                        <li
                            className={activeTab === 'content3' ? 'active' : ''}
                            onClick={() => setActiveTab('content3')}
                        >
                            Videos
                        </li>
                    </ul>
                </div>
            </div>
            <div className="contents">
                {activeTab === 'content1' && <MyContent1 />}
                {activeTab === 'content2' && <MyContent2 />}
                {activeTab === 'content3' && <MyContent3 />}
            </div>
        </div>
    );
};

export default mypage;
