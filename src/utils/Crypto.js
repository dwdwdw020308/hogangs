import CryptoJS from 'crypto-js';

// SHA-256 해시 함수
export const hashPassword = (password) => {
    return CryptoJS.SHA256(password).toString();
};

// 비밀번호 비교 함수 (입력값과 저장된 해시값 비교)
export const isPasswordMatch = (inputPassword, hashedPassword) => {
    const inputHashed = hashPassword(inputPassword);
    return inputHashed === hashedPassword;
};
