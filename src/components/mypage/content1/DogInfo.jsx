import React from 'react';

const DogInfo = () => {
    return (
        <div className="dogInfoBox" id="dogInfoBox">
            <div className="inner">
                <div className="infoForm">
                    <div className="title">
                        <h2>호강이의 정보를 입력해주세요.</h2>
                    </div>
                    <div className="infoFormBox">
                        <div className="infoLeft">
                            <div className="hogangprofile">
                                <img src="/mypage/hogangprofile.png" alt="hogangprofile" />
                            </div>
                            <div className="btnWrap">
                                <button>사진변경</button>
                                <button>삭제</button>
                            </div>
                        </div>
                        <div className="infoRight">
                            <div className="form-row">
                                <label>이름</label>
                                <input type="text" name="" id="" placeholder="예) 호강이" />
                            </div>
                            <div className="form-row">
                                <label>성별</label>
                                <div className="radioWrap">
                                    <label>
                                        <input type="radio" name="" id="" />
                                        여자아이
                                    </label>
                                    <label>
                                        <input type="radio" name="" id="" />
                                        남자아이
                                    </label>
                                </div>
                            </div>
                            <div className="form-row">
                                <label>생일</label>
                                <div className="selectWrap">
                                    <select name="" id="">
                                        <option value="">년도</option>
                                    </select>
                                    <select name="" id="">
                                        <option value="">월</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form-row">
                                <label>견종</label>
                                <input type="text" name="" id="" placeholder="예) 비숑" />
                            </div>
                            <div className="form-row">
                                <label>몸무게</label>
                                <input type="text" name="" id="" placeholder="예) 2.8" />
                                <p>kg</p>
                            </div>
                            <div className="form-row">
                                <label>중성화</label>
                                <div className="radioWrap">
                                    <label>
                                        <input type="radio" name="" id="" />
                                        했어요
                                    </label>
                                    <label>
                                        <input type="radio" name="" id="" />
                                        안했어요
                                    </label>
                                </div>
                            </div>
                            <div className="form-row">
                                <label>동물병원</label>
                                <input
                                    type="text"
                                    name=""
                                    id=""
                                    placeholder="예) 호강동물병원(강남구)"
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="vaccination">
                    <div className="title">
                        <h2>지금까지 완료하신 예방접종 여부를 선택해주세요.</h2>
                        <span>중복 선택 가능</span>
                    </div>
                    <div className="checkBox-Group">
                        <label>
                            <input type="checkbox" name="" id="" defaultChecked />
                            <p>
                                광견병 <span>1년 이내 접종완료</span>
                            </p>
                        </label>
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>
                                종합백신 <span>2년 이내 접종완료</span>
                            </p>
                        </label>
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>
                                코로나 <span>2년 이내 접종완료</span>
                            </p>
                        </label>
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>
                                켄넬코프 <span>2년 이내 접종완료</span>
                            </p>
                        </label>
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>접종을 하지 않았습니다.</p>
                        </label>
                    </div>
                </div>
                <div className="parasite">
                    <div className="title">
                        <h2>내/외부 기생충 관련 예방접종 여부를 선택해주세요.</h2>
                        <span>중복 선택 가능</span>
                    </div>
                    <div className="checkBox-Group">
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>
                                심장사상충 <span>1년 이내 접종완료</span>
                            </p>
                        </label>
                        <label>
                            <input type="checkbox" name="" id="" />
                            <p>
                                외부기생충 <span>1년 이내 접종완료</span>
                            </p>
                        </label>
                    </div>
                </div>
                <div className="health">
                    <div className="title">
                        <h2>건강 관련 주의사항을 알려주세요!</h2>
                        <span>*전영병이 있는 경우, 예약이 불가합니다.</span>
                    </div>

                    <div className="txt">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="예) 알러지 음식, 슬개골 탈구, 피부병 등"
                        />
                    </div>
                </div>
                <div className="more">
                    <div className="title">
                        <h2>참고사항을 입력해주세요.</h2>
                        <span>호강이에게 특이사항 또는 참고사항이 있다면 알려주세요.</span>
                    </div>

                    <div className="txt">
                        <input
                            type="text"
                            name=""
                            id=""
                            placeholder="예) 우리 강아지는 생식만 먹어요. 남자를 무서워하는 편이에요!"
                        />
                    </div>
                </div>
                <div className="btn">
                    <button>등록하기</button>
                </div>
            </div>
        </div>
    );
};

export default DogInfo;
