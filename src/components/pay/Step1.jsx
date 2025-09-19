import { format, parse, setISODay } from 'date-fns';
import { ko } from 'date-fns/locale';
import React, { useState } from 'react';
import { totalPrice } from '../../utils/Calc';

const getWeekDay = (date) => {
    const d = parse(date, 'yyyy-MM-dd', new Date()); // 로컬 자정으로 파싱
    return format(d, 'EEE', { locale: ko }); // 'EEE' = 금, 'EEEE' = 금요일
};
// 메인 컴포넌트
const Step1 = ({ resType, form }) => {
    const [isSync, setIsSync] = useState(false);
    const [userInfo, setUserInfo] = useState({});

    let type = '';
    switch (resType) {
        case 'hotel':
            type = '객실';
            break;
        case 'grooming':
            type = '미용';
            break;
    }

    const TypeSchedule = () => {
        if (resType === 'hotel') {
            return (
                <span className="b500">
                    일정 : {form.startDate}({getWeekDay(form.startDate)}) ~ {form.endDate}(
                    {getWeekDay(form.endDate)})
                </span>
            );
        }
    };
    const HotelOptionTypeService = () => {
        if (form.type) {
            return <span className="g500">미용 서비스: {form.type}</span>;
        }
    };
    const HotelOptionGroomingService = () => {
        if (form.option) {
            return <span className="g500">추가옵션: {form.option}</span>;
        }
    };

    const GoodsPrice = () => {
        const p = totalPrice(form);
        return <span className="goods_price">{p}원</span>;
    };

    const getMyInfo = () => {
        setIsSync(!isSync);
    };

    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const selectPhone = (e) => {
        console.log(e.target.value);
    };
    return (
        <section id="pay_step1">
            <div className="inner">
                <div className="pay_left">
                    <div className="pay_goods">
                        <div className="goods_inner">
                            <h3 className="goods_label">예약 상품 정보</h3>
                            <span className="goods_line"></span>
                            <div className="goods_context">
                                <span className="b500">
                                    {type} 기본 요금: {form.size}
                                </span>
                                <TypeSchedule />
                                <HotelOptionTypeService />
                                <HotelOptionGroomingService />
                                <GoodsPrice />
                            </div>
                        </div>
                    </div>
                    <div className="pay_user">
                        <h3 className="user_label">예약자 정보</h3>
                        <span className="user_line"></span>
                        <p className="user_text">
                            서비스 제공기간은 예약 상품 결제시부터 예약한 기간의 마지막 날 19시
                            까지입니다.
                            <br />
                            환불은 하단에 기재된 취소/환불 규정에 따라 ‘방문 7일 전’ 일자부터 일정
                            금액이 차감되어 환불 되며,
                            <br /> 그 이전에는 차감 없이 환불이 진행 됩니다. 환불은 카드사 사정에
                            따라 3~5 영업일이 소요될 수 있습니다.
                        </p>
                        <ul className="user_info_area">
                            <li>
                                <span className="info_label">이름</span>
                                <input
                                    type="text"
                                    name="name"
                                    value={userInfo.name}
                                    onChange={onChangeInput}
                                />
                            </li>
                            <li>
                                <span className="info_label">휴대전화</span>
                                <div className="phone">
                                    <select
                                        className="telFirst"
                                        name="telFirst"
                                        onChange={selectPhone}
                                    >
                                        <option value="">전화번호</option>
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                    <span>-</span>
                                    <input type="text" />
                                    <span>-</span>
                                    <input type="text" />
                                </div>
                            </li>
                            <li>
                                <span className="info_label">이메일</span>

                                <div className="email">
                                    <input type="text" />
                                    <span>@</span>
                                    <input type="text" />
                                    <select name="emailList" id="emailList" className="emailList">
                                        <option value="010">010</option>
                                        <option value="011">011</option>
                                        <option value="016">016</option>
                                        <option value="017">017</option>
                                        <option value="018">018</option>
                                        <option value="019">019</option>
                                    </select>
                                </div>
                            </li>
                            <li>
                                <span className="info_label">요청사항</span>
                                <select
                                    className="request_list"
                                    name="request"
                                    id="requestList"
                                ></select>
                            </li>
                        </ul>

                        {/* 내 정보 가져오기 버튼 */}
                        <div className="check__line">
                            <input
                                id="isSync"
                                type="checkbox"
                                checked={isSync}
                                onChange={getMyInfo}
                            />
                            <label htmlFor="isSync" className={isSync ? 'checked' : ''}>
                                <span>내 정보 가져오기</span>
                            </label>
                        </div>
                    </div>
                </div>
                <div className="pay_right"></div>
            </div>
        </section>
    );
};

export default Step1;
