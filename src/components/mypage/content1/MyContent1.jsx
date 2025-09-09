import React from 'react';
import { Link } from 'react-router-dom';

const MyContent1 = () => {
    return (
        <section id="mycontent1">
            <div className="topbar">
                <div className="topheader">
                    <img src="/mypage/image103.png" alt="" />
                    <p>호강이님</p>
                </div>
            </div>
            <div className="nav">
                <ul>
                    <li>MyPage</li>
                </ul>
                <Link to={'/videos'}>
                    <ul>
                        <li>Videos</li>
                    </ul>
                </Link>
                <ul>
                    <li>Hotel</li>
                </ul>
                <ul>
                    <li>Groomig</li>
                </ul>
            </div>
        </section>
    );
};

export default MyContent1;
