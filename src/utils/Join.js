import { hashPassword } from './Crypto';

// utils/dateUtils.js
export const getYearOptions = (minAge = 14, maxAge = 100) => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - maxAge; // 가장 오래된 연도
    const endYear = currentYear - minAge; // 가장 최근 연도

    const years = [];
    for (let year = endYear; year >= startYear; year--) {
        years.push(year);
    }
    return years;
};

export const getMonthOptions = () => {
    const months = [];
    for (let month = 1; month <= 12; month++) {
        months.push(month);
    }
    return months;
};

export const getDayOptions = () => {
    const days = [];
    for (let day = 1; day <= 31; day++) {
        days.push(day);
    }
    return days;
};

export const ValidateJoin = (data) => {
    const { email, password1, password2, phone, year, month, day } = data;

    if (!validateEmail(email)) {
        //email 검증
        return { error: -1, message: '이메일을 확인해주세요' };
    }
    if (!duplicateEmail(email)) {
        return { error: -1, message: '중복된 이메일입니다' };
    }

    if (!validatePassword(password1)) {
        //비밀번호1 검증
        return { error: -2, message: '비밀번호를 확인해주세요' };
    }

    if (!validatePassword(password2)) {
        //비밀번호2 검증
        return { error: -3, message: '비밀번호를 확인해주세요' };
    }

    if (!validatePasswordSame(password1, password2)) {
        //비밀번호 동일 입력 검증
        return { error: -4, message: '비밀번호가 동일하지 않습니다' };
    }

    if (year === '' || month === '' || day === '') {
        // 생년월일 미입력
        return { error: -5, message: '생년월일을 확인해주세요' };
    }
    if (!validatePhone(phone)) {
        // 핸드폰번호 검증
        return { error: -6, message: '핸드폰 번호를 확인해주세요' };
    }

    return { error: 0, message: '' };
};

const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
};

const validatePassword = (password) => {
    // 예: 8자 이상, 숫자 포함
    return password.length >= 8 && /\d/.test(password);
};

const validatePasswordSame = (pwd1, pwd2) => {
    return pwd1 === pwd2;
};

const validatePhone = (phone) => {
    // 하이픈 제거
    const cleaned = phone.replace(/-/g, '');
    // 한국 휴대폰 번호 형식 검증
    const re = /^01[016789][0-9]{7,8}$/;
    return re.test(cleaned);
};

const duplicateEmail = (email) => {
    const signUsers = JSON.parse(localStorage.getItem('signUsers')) || [];
    if (signUsers.includes(email)) {
        return false;
    } else {
        return true;
    }
};

export const fnSignUser = (data) => {
    const userInfo = {
        email: data.email,
        password: hashPassword(data.password1),
        birth: `${data.year}-${data.month}-${data.day}`,
        phone: data.phone,
    };
    const signUsers = JSON.parse(localStorage.getItem('signUsers')) || [];
    signUsers.push(userInfo);
    localStorage.setItem('signUsers', JSON.stringify(signUsers));
};
