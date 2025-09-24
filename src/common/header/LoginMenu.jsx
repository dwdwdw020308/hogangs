import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../store/useAuthStore';

const LoginMenu = () => {
    const user = useAuthStore((state) => state.user);
    const profile = user?.profile || '/mypage/hogangImg.png';
    const name = user != null ? user.name : '';

    const navigate = useNavigate();

    return (
        <div className="login-menu">
            <div className="profile">{<img src={profile} alt="" />}</div>
            <div className="name">
                <p
                    onClick={() => {
                        navigate('/mypage');
                    }}
                >
                    {name}님
                </p>
            </div>
        </div>
    );
};

export default LoginMenu;
