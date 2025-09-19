import { useEffect } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { useNavigate } from 'react-router-dom';

const RequireLogin = () => {
    const { isLogin } = useAuthStore();
    const setLoginModal = useAuthStore((s) => s.setLoginModal);
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLogin) {
            alert('예약은 회원만 가능합니다.');
            navigate('/');
            setLoginModal(true);
        }
    }, []);
    return <div></div>;
};

export default RequireLogin;
