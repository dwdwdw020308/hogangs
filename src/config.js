const isLocal = window.location.hostname === 'localhost';

export const KAKAO_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/oauth'
    : import.meta.env.VITE_KAKAO_REDIRECT_URI;

export const GOOGLE_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/authcallback'
    : import.meta.env.VITE_GOOGLE_REDIRECT_URI;

export const GOOGLE_REGISTER_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/googleRegister'
    : import.meta.env.VITE_GOOGLE_REGISTER_REDIRECT_URI;

export const KAKAO_REGISTER_REDIRECT_URI = isLocal
    ? 'http://localhost:5173/kakaoRegister'
    : import.meta.env.VITE_KAKAO_REGISTER_REDIRECT_URI;

export const API_URL = isLocal ? 'http://localhost:3000' : import.meta.env.VITE_API_URL;
// export const API_URL = import.meta.env.VITE_API_URL;
