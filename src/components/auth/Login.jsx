import React from 'react';

const Login = () => {
    return (
        <div className="login-overlay">
            <div className="login-modal">
                <div className="left">
                    <img src="" alt="" />
                </div>
                <div className="right">
                    <i className="close-btn"></i>
                    <div className="login-inner">
                        <div className="top">
                            <h2>로그인</h2>
                            <form>
                                <input type="text" name="" id="" placeholder="이메일" />
                                <input type="text" name="" id="" placeholder="비밀번호" />
                            </form>
                        </div>
                        <div className="bottom">
                            <button>로그인</button>
                            <span className="join-btn">회원가입</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
