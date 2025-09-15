import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DogInfo from './DogInfo';
import CouponItem from './CouponItem';

const MyContent1 = () => {
    const [activeTab, setActiveTab] = useState('default');
    return (
        <section id="mycontent1">
            <div className="inner">
                {activeTab === 'default' && (
                    <>
                        <div className="dogInfo">
                            <div className="title">
                                <h2>호강이의 정보를 입력해주세요.</h2>
                            </div>
                            <div className="infoBox">
                                <div className="puppyImg">
                                    <img src="/mypage/puppy.png" alt="" />
                                </div>
                                <div className="text">
                                    <strong>반려동물의 프로필이 없습니다.</strong>
                                    <p>
                                        함께 키우시는 반려동물 프로필을 <br />
                                        등록하시면 빠른 예약 진행이 가능합니다.
                                    </p>
                                </div>
                                <div className="btn">
                                    <button onClick={() => setActiveTab('dogInfo')}>
                                        등록하기
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="ownerInfo">
                            <div className="title">
                                <h2>주인님의 정보</h2>
                                <span>수정 +</span>
                            </div>
                            <dl>
                                <div className="row">
                                    <dt>이름</dt>
                                    <dd>이름이름</dd>
                                </div>
                                <div className="row">
                                    <dt>연락처</dt>
                                    <dd>연락처연락처</dd>
                                </div>
                                <div className="row">
                                    <dt>이메일</dt>
                                    <dd>이메일이메일</dd>
                                </div>
                                <div className="row">
                                    <dt>주소</dt>
                                    <dd>주소주소</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="coupon">
                            <div className="title">
                                <h2>쿠폰</h2>
                            </div>
                            <ul className="tab">
                                <li className="on">사용 가능 쿠폰</li>
                                <li>사용기간 만료 쿠폰</li>
                            </ul>
                            <div className="couponList">
                                <CouponItem />
                                <CouponItem />
                                <CouponItem />
                                <CouponItem />
                                <CouponItem />
                                <CouponItem />
                            </div>
                        </div>
                    </>
                )}
                {activeTab === 'dogInfo' && <DogInfo />}
            </div>
        </section>
    );
};

export default MyContent1;
