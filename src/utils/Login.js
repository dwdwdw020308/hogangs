import { hashPassword } from './Crypto';

export const ValidateLogin = (data) => {
    const { email, password } = data;

    if (!validateEmail(email)) {
        return { error: -1 };
    }

    if (!validatePassword(password)) {
        return { error: -2 };
    }

    return { error: 0 };
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    // 예: 8자 이상, 숫자 포함
    return password.length >= 8 && /\d/.test(password);
};

export const fnLogin = (data) => {
    const { email, password } = data;
    const signUsers = JSON.parse(localStorage.getItem('signUsers')) || [];
    const user = signUsers.find((u) => u.email === email);

    if (!user) {
        return { success: false, message: '이메일이 존재하지 않습니다.' };
    }

    // 3. 비밀번호 해시 후 비교
    const hashedInputPassword = hashPassword(password);

    if (user.password !== hashedInputPassword) {
        return { success: false, message: '비밀번호가 일치하지 않습니다.' };
    }

    return {
        success: true,
        message: '',
        user: { email: user.email, birth: user.birth, phone: user.phone, nickName: '' },
    };
};
