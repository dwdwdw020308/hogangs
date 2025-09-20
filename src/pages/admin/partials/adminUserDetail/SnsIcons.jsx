const IconGoogle = ({ active, size = 20, title }) => (
    <svg
        className={`sns-icon ${active ? 'on' : ''}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-label="Google"
        title={title}
    >
        <path
            fill="#EA4335"
            d="M12 11v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-3.1 0-5.7-2.6-5.7-5.8S8.9 6.6 12 6.6c1.8 0 3 .7 3.7 1.3l2.5-2.4C16.8 4 14.6 3 12 3 7.4 3 3.7 6.7 3.7 11.4S7.4 19.8 12 19.8c6.1 0 8.1-4.2 8.1-6.3 0-.5-.1-1-.2-1.4H12z"
        />
        <path
            fill="#34A853"
            d="M4.9 8.9l3 2.2c.8-2.3 2.8-3.8 5.1-3.8 1.8 0 3 .7 3.7 1.3l2.5-2.4C16.8 4 14.6 3 12 3 8.6 3 5.7 5 4.9 8.9z"
            opacity=".9"
        />
        <path
            fill="#4285F4"
            d="M12 20c3.6 0 6.2-2.3 7.1-5.3l-7.1-5v3.6h5.1c-.2 1.2-1.5 3.6-5.1 3.6-2.3 0-4.3-1.5-5.1-3.7l-2.9 2.2C5.7 18.8 8.6 20 12 20z"
            opacity=".9"
        />
        <path
            fill="#FBBC05"
            d="M6.9 13.1c-.2-.6-.3-1.2-.3-1.9 0-.6.1-1.3.3-1.9l-3-2.2C3.4 7.9 3 9.6 3 11.4c0 1.8.4 3.5 1 5l2.9-2.2z"
            opacity=".9"
        />
    </svg>
);

const IconKakao = ({ active, size = 20, title }) => (
    <svg
        className={`sns-icon ${active ? 'on' : ''}`}
        width={size}
        height={size}
        viewBox="0 0 24 24"
        aria-label="Kakao"
        title={title}
    >
        <path
            d="M12 4C7.6 4 4 6.8 4 10.3c0 2.1 1.4 3.9 3.6 5l-.8 3 3.2-2c.6.1 1.3.2 2 .2 4.4 0 8-2.8 8-6.2S16.4 4 12 4z"
            fill="#FEE500"
            stroke="#bdb76b"
            strokeWidth="0.6"
        />
    </svg>
);
const SnsIcons = ({ snsLinks = [], size = 20 }) => {
    const set = new Set((snsLinks || []).map((s) => String(s.provider || '').toLowerCase()));
    const emailOf = (p) =>
        snsLinks.find((s) => (s.provider || '').toLowerCase() === p)?.snsEmail || '';

    return (
        <div className="sns-icons">
            <IconGoogle
                active={set.has('google')}
                size={size}
                title={emailOf('google') || 'Google'}
            />
            <IconKakao active={set.has('kakao')} size={size} title={emailOf('kakao') || 'Kakao'} />
        </div>
    );
};

export default SnsIcons;
