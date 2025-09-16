import React, { useEffect, useState } from "react";
import DogInfo from "./DogInfo";
import CouponItem from "./CouponItem";
import ExpiredCouponItem from "./ExpiredCouponItem";
import { useNavigate } from "react-router-dom";

const MyContent1 = () => {
  const [pageTab, setPageTab] = useState("default");
  const [userInfo, setUserInfo] = useState(null);
  const [dogProfiles, setDogProfiles] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [couponTab, setCouponTab] = useState("available");

  const navigate = useNavigate();

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
            {/*  강아지 정보 */}
            <div className="dogInfo">
              <div className="title">
                <h2>호강이의 정보를 입력해주세요.</h2>
              </div>
              <div className="infoBox">
                {/*  아무 것도 없을 때 */}
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

                {/*  등록된 강아지들 */}
                {dogProfiles.map((dog, index) => (
                  <div key={index} className="infoBox-add">
                    <div className="edit">
                      <span
                        onClick={() => {
                          setEditIndex(index); //  어떤 프로필 수정할지 기억
                          setPageTab("dogInfo");
                        }}
                      >
                        프로필 수정하기
                      </span>
                    </div>
                    <div className="box">
                      <div className="top">
                        <div className="hogangPic">
                          <img
                            src="/mypage/hogangPic.png"
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

                {/*  추가 버튼 */}
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
                          setEditIndex(null); //  새 추가 모드
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
                    // onClick={() => {
                    //   localStorage.removeItem("user"); // ✅ user 삭제
                    //   navigate("/"); // ✅ 메인으로 이동
                    // }}
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

              <ul className="tab">
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
              <div className="couponList">
                {couponTab === "available" ? (
                  <>
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

        {/*  DogInfo 등록/수정 */}
        {pageTab === "dogInfo" && (
          <DogInfo
            initialData={editIndex !== null ? dogProfiles[editIndex] : null}
            onSave={(data) => {
              if (editIndex !== null) {
                // 수정 모드
                setDogProfiles((prev) =>
                  prev.map((dog, i) => (i === editIndex ? data : dog))
                );
              } else {
                // 추가 모드
                setDogProfiles((prev) => [...prev, data]);
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
