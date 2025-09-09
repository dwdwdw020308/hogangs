import React from "react";

const Step2 = ({ onNext, onClose, step }) => {
  const years = Array.from({ length: 100 }, (_, i) => 2011 - i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  return (
    <div className="join-overlay">
      <div className="join-modal">
        <div className="left">
          <img src="/auth/joinBg2.png" alt="" />
        </div>
        <div className="right">
          <i className="close-btn" onClick={onClose}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M2.29214 19.1407L0.355469 17.2604L8.10214 9.7393L0.355469 2.21817L2.29214 0.337891L10.0388 7.85902L17.7855 0.337891L19.7221 2.21817L11.9755 9.7393L19.7221 17.2604L17.7855 19.1407L10.0388 11.6196L2.29214 19.1407Z"
                fill="#454545"
              />
            </svg>
          </i>
          <div className="join-inner">
            <div className="top">
              <h2>회원가입</h2>
              <ul className="steps">
                <li className={step === 1 ? "on" : ""}>1</li>
                <li className={step === 2 ? "on" : ""}>2</li>
                <li className={step === 3 ? "on" : ""}>3</li>
              </ul>
            </div>
            <div className="bottom">
              <form>
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="실명입력"
                  autoFocus
                />
                <div className="birth">
                  <span>생년월일</span>
                  <div className="selects">
                    <div className="wrap">
                      <select className="year" name="" id="">
                        <option value="">년도</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </select>
                      <span>년</span>
                    </div>
                    <div className="wrap">
                      <select className="month" name="" id="">
                        <option value="">월</option>
                        {months.map((m) => (
                          <option key={m} value={m}>
                            {m}
                          </option>
                        ))}
                      </select>
                      <span>월</span>
                    </div>
                    <div className="wrap">
                      <select className="day" name="" id="">
                        <option value="">일</option>
                        {days.map((d) => (
                          <option key={d} value={d}>
                            {d}
                          </option>
                        ))}
                      </select>
                      <span>일</span>
                    </div>
                  </div>
                </div>
                <div className="phone">
                  <span>휴대폰 번호</span>
                  <div className="selects">
                    <select name="first" id="">
                      <option value="010">010</option>
                      <option value="011">011</option>
                      <option value="016">016</option>
                      <option value="017">017</option>
                      <option value="018">018</option>
                      <option value="019">019</option>
                    </select>
                    <span>-</span>
                    <input type="text" name="middle" id="" />
                    <span>-</span>
                    <input type="text" name="last" id="" />
                  </div>
                </div>
              </form>
              <div className="next-btn">
                <button onClick={onNext}>다음</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step2;
