import React, { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import CouponItem from "./CouponItem";
import ExpiredCouponItem from "./ExpiredCouponItem";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../../../store/useAuthStore";

const MyContent1 = ({ onUpdateDogProfile }) => {
  //  props로 받음
  const [pageTab, setPageTab] = useState("default");
  const [userInfo, setUserInfo] = useState(null);
  const [dogProfiles, setDogProfiles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [couponTab, setCouponTab] = useState("available");
  const [periodTab, setPeriodTab] = useState("3m"); // 기본 3개월

  const navigate = useNavigate();

  const logout = useAuthStore((state) => state.logout);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserInfo(JSON.parse(storedUser));
    }
  }, []);

  const formatPhone = (phone) => {
    if (!phone) return "연락처 없음";
    return phone.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
  };

  return (
    <section id="mycontent1">
      <div className="inner">
        {pageTab === "default" && (
          <>
            {/* 🐶 강아지 정보 */}
            <div className="dogInfo">
              <div className="title">
                <h2>호강이의 정보를 입력해주세요.</h2>
              </div>
              <div className="infoBox">
                {/* 아무 것도 없을 때 */}
                {dogProfiles.length === 0 && (
                  <div className="infoBox-empty">
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
                      <button
                        onClick={() => {
                          setEditIndex(null);
                          setPageTab("dogInfo");
                        }}
                      >
                        등록하기
                      </button>
                    </div>
                  </div>
                )}

                {/* 등록된 강아지들 */}
                {dogProfiles.map((dog, index) => (
                  <div key={index} className="infoBox-add">
                    <div className="edit">
                      <span
                        onClick={() => {
                          setEditIndex(index);
                          setPageTab("dogInfo");
                        }}
                      >
                        프로필 수정하기
                      </span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="6"
                        height="9"
                        viewBox="0 0 6 9"
                        fill="none"
                      >
                        <path
                          d="M1 8.5L5 4.5L1 0.5"
                          stroke="#7ABAB6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <div className="box">
                      <div className="top">
                        <div className="hogangPic">
                          <img
                            src={dog.profileImage || "/mypage/hogangPic.png"}
                            alt="hogangPic"
                            className="dog-photo"
                          />
                          <img
                            src="/mypage/bone.png"
                            alt="bone"
                            className="dog-bone"
                          />
                        </div>
                      </div>
                      <div className="bottom">
                        <div className="about">
                          <div className="name">{dog.name}</div>
                          <div className="age">{dog.age}살</div>
                        </div>
                        <div className="uses">
                          <div className="hotelUses">
                            <p>호텔 이용 횟수</p>
                            <strong>0</strong>
                          </div>
                          <div className="groomingUses">
                            <p>미용 이용 횟수</p>
                            <strong>0</strong>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* 추가 버튼 */}
                {dogProfiles.length > 0 && (
                  <div className="infoBox-another">
                    <div className="puppyImg">
                      <img src="/mypage/puppy.png" alt="" />
                    </div>
                    <div className="text">
                      <strong>함께하는 호강이가 더 있나요?</strong>
                      <p>
                        함께 키우시는 반려동물 프로필을
                        <br />
                        등록하시면 빠른 예약 진행이 가능합니다.
                      </p>
                    </div>
                    <div className="btn">
                      <button
                        onClick={() => {
                          setEditIndex(null);
                          setPageTab("dogInfo");
                        }}
                      >
                        반려동물 추가
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/*  주인 정보 */}
            <div className="ownerInfo">
              <div className="title">
                <h2>주인님의 정보</h2>
                <span>수정 +</span>
              </div>
              <dl>
                <div className="row">
                  <dt>이름</dt>
                  <dd>{userInfo?.name || "이름 없음"}</dd>
                </div>
                <div className="row">
                  <dt>연락처</dt>
                  <dd>{formatPhone(userInfo?.phone)}</dd>
                </div>
                <div className="row">
                  <dt>이메일</dt>
                  <dd>{userInfo?.email || "이메일 없음"}</dd>
                </div>
                <div className="actions">
                  <span className="sns">SNS 연동하기</span>
                  <span
                    className="logout"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                  >
                    로그아웃
                  </span>
                </div>
              </dl>
            </div>

            {/*  쿠폰 */}
            <div className="coupon">
              <div className="title">
                <h2>쿠폰</h2>
              </div>
              <div className="tab">
                <ul className="couponTab">
                  <li
                    className={couponTab === "available" ? "on" : ""}
                    onClick={() => setCouponTab("available")}
                  >
                    사용 가능 쿠폰
                  </li>
                  <li
                    className={couponTab === "expired" ? "on" : ""}
                    onClick={() => setCouponTab("expired")}
                  >
                    사용기간 만료 쿠폰
                  </li>
                </ul>
                {/* 기간 탭 */}
                <ul className="subTab">
                  <li
                    className={periodTab === "1m" ? "on" : ""}
                    onClick={() => setPeriodTab("1m")}
                  >
                    1개월
                  </li>
                  <li
                    className={periodTab === "3m" ? "on" : ""}
                    onClick={() => setPeriodTab("3m")}
                  >
                    3개월
                  </li>
                  <li
                    className={periodTab === "6m" ? "on" : ""}
                    onClick={() => setPeriodTab("6m")}
                  >
                    6개월
                  </li>
                </ul>
              </div>

              <div className="couponList">
                {couponTab === "available" ? (
                  <>
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                    <CouponItem />
                  </>
                ) : (
                  <>
                    <ExpiredCouponItem />
                    <ExpiredCouponItem />
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {/* 🐶 DogInfo 등록/수정 */}
        {pageTab === "dogInfo" && (
          <DogInfo
            initialData={editIndex !== null ? dogProfiles[editIndex] : null}
            isEdit={editIndex !== null}
            onSave={(data) => {
              if (editIndex !== null) {
                // 수정 모드
                setDogProfiles((prev) =>
                  prev.map((dog, i) => (i === editIndex ? data : dog))
                );
              } else {
                // 추가 모드
                setDogProfiles((prev) => [...prev, data]);

                //topheader는 첫 번째 강아지가 등록될 때만 업데이트
                if (dogProfiles.length === 0 && onUpdateDogProfile) {
                  onUpdateDogProfile({
                    name: data.name || "호강이",
                    profileImage: data.profileImage || "/mypage/hogangImg.png",
                  });
                }
              }

              setEditIndex(null);
              setPageTab("default");
            }}
          />
        )}
      </div>
    </section>
  );
};

export default MyContent1;
