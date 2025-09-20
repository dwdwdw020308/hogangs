import React, { useState } from "react";
import MyContent1 from "../../components/mypage/content1/MyContent1";
import MyContent3 from "../../components/mypage/content3/MyContent3";

const MyPage = () => {
  const [activeTab, setActiveTab] = useState("content1");

  // 기본 프로필 상태
  const [dogProfile, setDogProfile] = useState({
    name: "호강이",
    profileImage: "/mypage/hogangImg.png",
  });

  return (
    <div className="myPage" id="myPage">
      <div className="topheader">
        <div className="topName">
          <div className="topName-box">
            <img src={dogProfile.profileImage} alt="강아지 프로필" />
            <p>{dogProfile.name}님</p>
          </div>
        </div>
        <div className="nav">
          <ul>
            <li
              className={activeTab === "content1" ? "active" : ""}
              onClick={() => setActiveTab("content1")}
            >
              MyPage
            </li>
            <li
              className={activeTab === "content3" ? "active" : ""}
              onClick={() => setActiveTab("content3")}
            >
              Videos
            </li>
          </ul>
        </div>
      </div>
      <div className="contents">
        {activeTab === "content1" && (
          <MyContent1 onUpdateDogProfile={setDogProfile} />
        )}
        {activeTab === "content3" && <MyContent3 />}
      </div>
    </div>
  );
};

export default MyPage;
