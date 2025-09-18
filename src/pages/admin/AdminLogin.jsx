import { useState } from 'react';
import '../../styles/admin/_login.scss';
import axios from 'axios';
import { API_URL } from '../../config';
import { useNavigate } from 'react-router-dom';

const ADMIN_STORAGE_KEY = 'adminAuth';

export default function AdminLogin() {
    const [mode, setMode] = useState('signin');
    const [loginForm, setLoginForm] = useState({ id: '', password: '' });
    const navigate = useNavigate();
    const onLogin = async (e) => {
        e.preventDefault();
        const url = API_URL + '/admin/login';
        
        const res = await axios.post(url,loginForm,{headers:{'Content-Type':"application/json"}});
        const {error, message} = res.data;

        switch(error){
            case -1:
                alert('존재 하지 않는 아이디 입니다.');
                break;
            case -2:
                alert('비밀번호가 틀렸습니다.');
                break;
            case 0:    
                const token =  '1'; // 최소한 문자열 하나 저장
                localStorage.setItem(ADMIN_STORAGE_KEY, token);
                setLoginForm({ id: '', password: '' });
                navigate('/admin')
            break;
        }

    };
    const onChangeInput = (e) => {
        const { name, value } = e.target;

        setLoginForm((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <div className="admin_login_wrapper">
            <div className={`auth-card ${mode === 'signup' ? 'signup-active' : ''}`}>
                {/* Sign In (LEFT) */}
                <div className="container__form container--signin">
                    <form className="form" onSubmit={onLogin}>
                        <h2 className="form__title">Sign In</h2>
                        <input
                            type="id"
                            placeholder="Id"
                            className="input"
                            value={loginForm.id}
                            name="id"
                            onChange={onChangeInput}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="input"
                            value={loginForm.password}
                            name="password"
                            onChange={onChangeInput}
                        />
                        <a href="#" className="link">
                            Forgot your password?
                        </a>
                        <button className="btn">Sign In</button>
                    </form>
                </div>

                {/* Sign Up (RIGHT) */}
                <div className="container__form container--signup">
                    <form className="form" onSubmit={(e) => e.preventDefault()}>
                        <h2 className="form__title">Sign Up</h2>
                        <input type="text" placeholder="User" className="input" />
                        <input type="email" placeholder="Email" className="input" />
                        <input type="password" placeholder="Password" className="input" />
                        <button className="btn">Sign Up</button>
                    </form>
                </div>

                {/* Overlay (slides left/right only) */}
                <div className="container__overlay">
                    <div className="overlay">
                        <div className="overlay__panel overlay--left">
                            <button className="btn" onClick={() => setMode('signin')}>
                                Sign In
                            </button>
                        </div>
                        <div className="overlay__panel overlay--right">
                            <button className="btn" onClick={() => setMode('signup')}>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
