import React, { useRef, useState } from 'react';

const User = () => {
    const [isSync, setIsSync] = useState(false);
    const [userInfo, setUserInfo] = useState({});
    const [lockDomain, setLockDomain] = useState(false);
    const domainRef = useRef(null);
    const telFirstRef = useRef(null);

    const splitPhone344 = (str) => {
        const digits = (str || '').replace(/\D/g, '');
        const m = digits.match(/^(\d{3})(\d{4})(\d{4})$/);
        if (!m) return { p1: '', p2: '', p3: '' };
        const [, p1, p2, p3] = m;
        return { p1, p2, p3 };
    };

    const getMyInfo = () => {
        setIsSync((s) => !s);

        const local = localStorage.getItem('user');
        if (!local) return;

        let obj;
        try {
            obj = JSON.parse(local);
        } catch (e) {
            console.error('localstorage Error', e);
            return;
        }

        const emailStr = String(obj?.email ?? '');
        const [emailId = '', emailDomain = ''] = emailStr.split('@', 2);

        const { p1, p2, p3 } = splitPhone344(String(obj?.phone ?? ''));

        setUserInfo((prev) => ({
            ...prev,
            name: obj?.name ?? '',
            emailId,
            emailDomain,
            telFirst: p1,
            telSecond: p2,
            telThird: p3,
        }));
    };
    const onChangeInput = (e) => {
        const { name, value } = e.target;
        setUserInfo((prev) => ({ ...prev, [name]: value }));
    };

    const selectPhone = (e) => {
        const value = e.target.value;
        telFirstRef.current.value = value;
    };

    const selectEmail = (e) => {
        const value = e.target.value;

        if (value !== '') {
            setLockDomain(true);
        } else {
            setLockDomain(false);
        }
        domainRef.current.value = value;
    };
    return (
        <div className="pay_user">
            <h3 className="user_label">예약자 정보</h3>
            <span className="user_line"></span>
            <p className="user_text">
                서비스 제공기간은 예약 상품 결제시부터 예약한 기간의 마지막 날 19시 까지입니다.
                <br />
                환불은 하단에 기재된 취소/환불 규정에 따라 ‘방문 7일 전’ 일자부터 일정 금액이
                차감되어 환불 되며,
                <br /> 그 이전에는 차감 없이 환불이 진행 됩니다. 환불은 카드사 사정에 따라 3~5
                영업일이 소요될 수 있습니다.
            </p>
            <ul className="user_info_area">
                <li>
                    <span className="info_label">이름</span>
                    <input type="text" name="name" value={userInfo.name} onChange={onChangeInput} />
                </li>
                <li>
                    <span className="info_label">휴대전화</span>
                    <div className="phone">
                        <select
                            className="telFirst"
                            name="telFirst"
                            value={userInfo.telFirst}
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
                        <input
                            type="text"
                            name="telSecond"
                            value={userInfo.telSecond}
                            onChange={onChangeInput}
                        />
                        <span>-</span>
                        <input
                            type="text"
                            name="telThird"
                            value={userInfo.telThird}
                            onChange={onChangeInput}
                        />
                    </div>
                </li>
                <li>
                    <span className="info_label">이메일</span>

                    <div className="email">
                        <input
                            type="text"
                            name="emailId"
                            value={userInfo.emailId}
                            onChange={onChangeInput}
                        />
                        <span>@</span>
                        <input
                            type="text"
                            ref={domainRef}
                            name="emailDomain"
                            value={userInfo.emailDomain}
                            readOnly={lockDomain}
                            onChange={onChangeInput}
                        />
                        <select
                            name="emailList"
                            id="emailList"
                            className="emailList"
                            onChange={selectEmail}
                        >
                            <option value="">직접입력</option>
                            <option value="google.com">google.com</option>
                            <option value="naver.com">naver.com</option>
                            <option value="nate.com">nate.com</option>
                        </select>
                    </div>
                </li>
                <li>
                    <span className="info_label">요청사항</span>
                    <select className="request_list" name="request" id="requestList"></select>
                </li>
            </ul>

            {/* 내 정보 가져오기 버튼 */}
            <div className="check__line">
                <input id="isSync" type="checkbox" checked={isSync} onChange={getMyInfo} />
                <label htmlFor="isSync" className={isSync ? 'checked' : ''}>
                    <span>내 정보 가져오기</span>
                </label>
            </div>
        </div>
    );
};

export default User;
