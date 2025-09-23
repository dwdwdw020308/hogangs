import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const NavMobile = ({ onClose }) => {
    const navigate = useNavigate();
    return (
        <nav id="navMobile">
            <div className="login-area">
                <span>로그인이 필요합니다.</span>
                <span className="loginTxt">로그인</span>
            </div>

            <ul className="menu-list">
                <li
                    onClick={() => {
                        navigate('/about');
                        onClose();
                    }}
                >
                    Brand Story
                </li>
                <li
                    onClick={() => {
                        navigate('/video');
                        onClose();
                    }}
                >
                    Videos
                </li>
                <li
                    onClick={() => {
                        navigate('/hotel');
                        onClose();
                    }}
                >
                    Hotel
                </li>
                <li
                    onClick={() => {
                        navigate('/grooming');
                        onClose();
                    }}
                >
                    Grooming
                </li>
            </ul>
        </nav>
    );
};

export default NavMobile;
