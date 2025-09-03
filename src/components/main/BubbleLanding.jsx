import React, { useRef, useState } from 'react';

export default function BubbleLanding({ onClose }) {
    const [popped, setPopped] = useState(false);
    const overlayRef = useRef(null);
    const bubbleRef = useRef(null);

    const handlePop = () => {
        if (popped) return;
        setPopped(true);

        // 마스크 시작 좌표를 "비눗방울 중심"으로 세팅 (센터-아웃)
        const overlay = overlayRef.current;
        const bubble = bubbleRef.current;
        const oRect = overlay.getBoundingClientRect();
        const bRect = bubble.getBoundingClientRect();
        const cx = ((bRect.left + bRect.width / 2 - oRect.left) / oRect.width) * 100;
        const cy = ((bRect.top + bRect.height / 2 - oRect.top) / oRect.height) * 100;
        overlay.style.setProperty('--cx', `${cx}%`);
        overlay.style.setProperty('--cy', `${cy}%`);

        // 팝 애니메이션 끝나면 오버레이 제거
        // (스플래시 0.23s + 딜레이 0.07s + 마스크 확장 0.9s ≈ 1.2s)
        setTimeout(() => onClose && onClose(), 1200);
    };

    return (
        <div ref={overlayRef} className={`landing-overlay ${popped ? 'pop' : ''}`}>
            {/* defs는 컴포넌트 내부에 포함 (ID 충돌 방지 위해 이 컴포넌트 안에서만 사용) */}
            <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
                <defs>
                    {/* Bubble transparency */}
                    <radialGradient id="bl-grad-bw" fx="25%" fy="25%">
                        <stop offset="0%" stopColor="black" />
                        <stop offset="30%" stopColor="black" stopOpacity=".2" />
                        <stop offset="97%" stopColor="white" stopOpacity=".4" />
                        <stop offset="100%" stopColor="black" />
                    </radialGradient>

                    <mask id="bl-mask" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="url(#bl-grad-bw)" />
                    </mask>

                    {/* Light spot */}
                    <radialGradient id="bl-grad-spot" fx="50%" fy="20%">
                        <stop offset="10%" stopColor="white" stopOpacity=".7" />
                        <stop offset="70%" stopColor="white" stopOpacity="0" />
                    </radialGradient>

                    {/* Top & bottom light */}
                    <radialGradient id="bl-grad-bw-light" fy="10%">
                        <stop offset="60%" stopColor="black" stopOpacity="0" />
                        <stop offset="90%" stopColor="white" stopOpacity=".25" />
                        <stop offset="100%" stopColor="black" />
                    </radialGradient>

                    <mask id="bl-mask-light-top" maskContentUnits="objectBoundingBox">
                        <rect
                            width="1"
                            height="1"
                            fill="url(#bl-grad-bw-light)"
                            transform="rotate(180, .5, .5)"
                        />
                    </mask>
                    <mask id="bl-mask-light-bottom" maskContentUnits="objectBoundingBox">
                        <rect width="1" height="1" fill="url(#bl-grad-bw-light)" />
                    </mask>

                    {/* Colors of bubble */}
                    <linearGradient id="bl-grad" x1="0" y1="100%" x2="100%" y2="0">
                        <stop offset="0%" stopColor="dodgerblue" />
                        <stop offset="50%" stopColor="fuchsia" />
                        <stop offset="100%" stopColor="yellow" />
                    </linearGradient>

                    {/* Splash (파티클 느낌의 대시 원) */}
                    <symbol id="bl-splash" viewBox="0 0 200 200">
                        <g fill="none" stroke="white" strokeOpacity=".8">
                            <circle
                                r="98"
                                cx="100"
                                cy="100"
                                strokeWidth="6"
                                strokeDasharray="2 20"
                            />
                            <circle
                                r="88"
                                cx="100"
                                cy="100"
                                strokeWidth="4"
                                strokeDasharray="2 10"
                            />
                            <circle
                                r="78"
                                cx="100"
                                cy="100"
                                strokeWidth="2"
                                strokeDasharray="2 16"
                            />
                            <circle
                                r="66"
                                cx="100"
                                cy="100"
                                strokeWidth="6"
                                strokeDasharray="2 12"
                            />
                            <circle
                                r="52"
                                cx="100"
                                cy="100"
                                strokeWidth="2"
                                strokeDasharray="2 14"
                            />
                            <circle
                                r="36"
                                cx="100"
                                cy="100"
                                strokeWidth="2"
                                strokeDasharray="2 16"
                            />
                        </g>
                    </symbol>
                </defs>
            </svg>

            {/* 500x500 비눗방울 */}
            <svg
                ref={bubbleRef}
                className={`bubble ${popped ? 'popping' : ''}`}
                viewBox="0 0 200 200"
                width="500"
                height="500"
                onClick={handlePop}
                aria-label="bubble"
            >
                <g className="bubble__group">
                    {/* 반사 하이라이트 */}
                    <ellipse
                        rx="40"
                        ry="20"
                        cx="150"
                        cy="150"
                        fill="url(#bl-grad-spot)"
                        transform="rotate(-225, 150, 150)"
                    />
                    <circle
                        r="100"
                        cx="100"
                        cy="100"
                        fill="aqua"
                        mask="url(#bl-mask-light-bottom)"
                    />
                    <circle
                        r="100"
                        cx="100"
                        cy="100"
                        fill="yellow"
                        mask="url(#bl-mask-light-top)"
                    />
                    <ellipse
                        rx="55"
                        ry="25"
                        cx="55"
                        cy="55"
                        fill="url(#bl-grad-spot)"
                        transform="rotate(-45, 55, 55)"
                    />
                    {/* 본체 */}
                    <circle r="100" cx="100" cy="100" fill="url(#bl-grad)" mask="url(#bl-mask)" />
                </g>

                {/* 스플래시(파티클) */}
                <use xlinkHref="#bl-splash" className="bubble__splash" />
            </svg>
        </div>
    );
}
