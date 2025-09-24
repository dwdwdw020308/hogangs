import React from 'react';
import useAuthStore from '../../store/useAuthStore';

const NotLogin = () => {
    const setLoginModal = useAuthStore((state) => state.setLoginModal);
    const setJoinModal = useAuthStore((state) => state.setJoinModal);
    return (
        <ul id="notLogin" className="top-menu">
            <li className="login_btn" onClick={() => setLoginModal(true)}>
                Login
            </li>
            <li className="bar"></li>
            <li className="join_btn" onClick={() => setJoinModal(true)}>
                Join
            </li>
            <li></li>
        </ul>
    );
};

export default NotLogin;
