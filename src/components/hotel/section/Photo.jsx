import React from 'react';

const Photo = () => {
    return (
        <section id="hotel_photo_section">
            <div className="inner">
                <div className="right">
                    <h2 className="logo"></h2>
                    <span>
                        호강스 호텔은 반려견을 위한 가장 특별한 휴식처입니다. <br />
                        조용한 음악과 깨끗한 객실, 그리고 전문 케어팀의 세심한 돌봄으로
                        <br />
                        사랑하는 반려견의 하루를 완벽하게 책임집니다.
                    </span>
                </div>
                <img src="/hotel/photo/1.png" alt="" className="img1" />
                <img src="/hotel/photo/2.png" alt="" className="img2" />
                <img src="/hotel/photo/3.png" alt="" className="img3" />
                <img src="/hotel/photo/4.png" alt="" className="img4" />
            </div>
            <div className="text"></div>
        </section>
    );
};

export default Photo;
