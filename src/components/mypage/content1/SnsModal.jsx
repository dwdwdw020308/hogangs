import React from "react";
import useAuthStore from "../../../store/useAuthStore";

const SnsModal = ({ onClose }) => {
  const setLoginModal = useAuthStore((state) => state.setLoginModal);
  return (
    <div className="sns-overlay" id="sns-overlay">
      <div className="sns-modal">
        <div className="top">
          <i className="close-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M15.9492 2.35254C16.4186 1.88319 17.1791 1.88319 17.6484 2.35254C18.1175 2.8219 18.1177 3.58249 17.6484 4.05176L11.6992 10L17.6484 15.9492C18.1177 16.4185 18.1176 17.1791 17.6484 17.6484C17.1791 18.1178 16.4186 18.1178 15.9492 17.6484L10 11.6992L4.05176 17.6484C3.58242 18.1178 2.8209 18.1178 2.35156 17.6484C1.88273 17.1791 1.88259 16.4184 2.35156 15.9492L8.30078 10L2.35254 4.05176C1.88321 3.58241 1.88321 2.82091 2.35254 2.35156C2.82185 1.88277 3.58257 1.88258 4.05176 2.35156L10 8.30078L15.9492 2.35254Z"
                fill="#FEFEFE"
              />
            </svg>
          </i>
        </div>
        <div className="bottom">
          <div className="snsWrap">
            <div className="sns google">
              <div className="icon">
                <img src="/auth/google.png" alt="" />
              </div>
              <div className="txt">
                <p>구글</p>
                <span>연동하기</span>
              </div>
            </div>
            <div className="sns kakao">
              <div className="icon">
                <img src="/auth/kakao.png" alt="" />
              </div>
              <div className="txt">
                <p>카카오</p>
                <span>연동하기</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="modalOverlay" onClick={() => setLoginModal(false)} />
    </div>
  );
};

export default SnsModal;
