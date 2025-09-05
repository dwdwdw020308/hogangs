import React, { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';

export default function BubbleLanding({ onClose }) {
    const [popped, setPopped] = useState(false);
    const [showParticles, setShowParticles] = useState(false);
    const [origin, setOrigin] = useState({ x: '50%', y: '50%' });

    const overlayRef = useRef(null);
    const bubbleRef = useRef(null);
    const circleRef = useRef(null);
    const ulRef = useRef(null);

    useEffect(() => {
        const ul = ulRef.current;
        if (!ul) return;

        // 초기화 후 원본 2개만 구성 (Strict Mode 대비)
        ul.innerHTML = '';
        const base = [
            { normal: '/main/ganady.png', variant: '/main/ganady01.png' },
            { normal: '/main/ganady.png', variant: '/main/ganady01.png' },
        ];
        base.forEach(() => {
            const li = document.createElement('li');
            li.innerHTML = `
        <div class="dog">
          <img src="/main/ganady.png" alt="dog" />
          <img class="variant" src="/main/ganady01.png" alt="dog-variant" />
        </div>`;
            ul.appendChild(li);
        });

        const originalCount = ul.children.length;

        const ensureWidth = () => {
            const need = window.innerWidth * 2;
            while (ul.scrollWidth < need) {
                for (let i = 0; i < originalCount; i++) {
                    ul.appendChild(ul.children[i].cloneNode(true));
                }
            }
        };
        ensureWidth();
        window.addEventListener('resize', ensureWidth);

        // ===== 탱글 회전 + 좌측 진행(래핑) → li(.dog) 단위로 적용 =====
        const hodus = ul.querySelectorAll('.dog');
        const tl = gsap.timeline({ repeat: -1 });

        const shift = (px) => {
            gsap.to(ul, {
                x: `-=${px}`,
                duration: px / 22,
                ease: 'linear',
                onUpdate: () => {
                    const x = Math.abs(parseFloat(gsap.getProperty(ul, 'x')) || 0);
                    const half = ul.scrollWidth / 2;
                    if (x >= half) gsap.set(ul, { x: -(x - half) });
                },
            });
        };

        tl.to(hodus, {
            rotation: -15,
            x: -6,
            duration: 0.9,
            ease: 'sine.inOut',
            onStart: () => shift(20),
        })
            .to(hodus, {
                rotation: 15,
                x: 6,
                duration: 0.9,
                ease: 'sine.inOut',
                onStart: () => shift(20),
            })
            .to(hodus, {
                rotation: 0,
                x: 0,
                scaleY: 0.72,
                scaleX: 1.18,
                duration: 0.35,
                ease: 'power1.out',
            })
            .to(hodus, {
                scaleY: 1,
                scaleX: 1,
                duration: 0.9,
                ease: 'elastic.out(1, 0.4)',
                onStart: () => shift(20),
            });

        // 버블 둥실둥실
        if (bubbleRef.current) {
            const b = bubbleRef.current;
            const floatAmt = () => (b.getBoundingClientRect().height || 400) * 0.045;
            gsap.to(b, {
                y: -floatAmt(),
                duration: 2.4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
            });
        }

        // ===== 한 번에 하나만 전환: 버블 중심과 가장 가까운 li만 in-bubble =====
        const tick = () => {
            const circle = circleRef.current;
            const list = ulRef.current;
            if (!circle || !list) return;

            const cRect = circle.getBoundingClientRect();
            const cx = cRect.left + cRect.width / 2;
            const cy = cRect.top + cRect.height / 2;
            const r = cRect.width / 2;
            const r2 = r * r;

            const innerFactor = 0.74;
            const rInner = r * innerFactor;
            const r2Inner = rInner * rInner;

            const items = Array.from(list.querySelectorAll('li'));
            let best = null;
            for (const li of items) {
                const rct = li.getBoundingClientRect();
                const lx = (rct.left + rct.right) / 2;
                const ly = (rct.top + rct.bottom) / 2;
                const dx = cx - lx;
                const dy = cy - ly;
                const d2 = dx * dx + dy * dy;
                if (best === null || d2 < best.d2) best = { li, d2 };
            }
            items.forEach((li) => li.classList.remove('in-bubble'));
            if (best && best.d2 <= r2Inner) best.li.classList.add('in-bubble');
        };

        gsap.ticker.add(tick);
        window.addEventListener('resize', tick);

        return () => {
            gsap.ticker.remove(tick);
            window.removeEventListener('resize', tick);
            window.removeEventListener('resize', ensureWidth);
            tl.kill();
        };
    }, []);

    // 파편 생성
    const generateParticles = () => {
        const arr = [];
        for (let i = 0; i < 28; i++) {
            const ang = Math.random() * Math.PI * 2;
            const dist = 40 + Math.random() * 80;
            arr.push(
                <div
                    key={i}
                    className="bubble-particle"
                    style={{
                        '--x': `${Math.cos(ang) * dist}px`,
                        '--y': `${Math.sin(ang) * dist}px`,
                    }}
                />
            );
        }
        return arr;
    };

    // 버블 팝 → 중앙에서 바깥으로 리빌
    const handlePop = () => {
        if (popped) return;
        const overlay = overlayRef.current;
        const bubble = bubbleRef.current;
        if (!overlay || !bubble) return;

        const o = overlay.getBoundingClientRect();
        const b = bubble.getBoundingClientRect();
        const cxPct = ((b.left + b.width / 2 - o.left) / o.width) * 100;
        const cyPct = ((b.top + b.height / 2 - o.top) / o.height) * 100;
        const cxPx = b.left + b.width / 2 - o.left;
        const cyPx = b.top + b.height / 2 - o.top;

        overlay.style.setProperty('--cx', `${cxPct}%`);
        overlay.style.setProperty('--cy', `${cyPct}%`);
        setOrigin({ x: `${cxPx}px`, y: `${cyPx}px` });

        setPopped(true);
        setShowParticles(true);

        // 0.5초 뒤 → reveal 시작
        setTimeout(() => {
            overlay.classList.add('reveal');
            // 리빌 애니메이션 끝난 뒤 Visual로 전환
            setTimeout(() => onClose && onClose(), 1200);
        }, 500);
    };

    return (
        <div ref={overlayRef} className={`landing-overlay ${popped ? 'pop' : ''}`}>
            <h2 className="bubble-logo"></h2>
            {/* 강아지 행진 레이어 */}
            <div className="mung-content">
                <ul ref={ulRef}>
                    {['/main/ganady.png', '/main/ganady01.png'].map((_, idx) => (
                        <li key={idx}>
                            <div className="dog">
                                <img src="/main/ganady.png" alt="" />
                                <img className="variant" src="/main/ganady01.png" alt="" />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* 버블 */}
            <div className="bubble-wrap" aria-hidden={popped ? 'true' : 'false'}>
                <svg
                    ref={bubbleRef}
                    className={`bubble ${popped ? 'popping' : ''}`}
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid meet"
                    overflow="visible"
                    onClick={handlePop}
                    aria-label="bubble"
                >
                    <defs>
                        <radialGradient id="natural-bubble-grad" cx="30%" cy="30%" r="70%">
                            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
                            <stop offset="30%" stopColor="rgba(255,255,255,0.1)" />
                            <stop offset="70%" stopColor="rgba(200,230,255,0.05)" />
                            <stop offset="90%" stopColor="rgba(255,200,255,0.08)" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0.02)" />
                        </radialGradient>
                        <linearGradient id="subtle-rainbow" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="rgba(255,200,200,0.3)" />
                            <stop offset="25%" stopColor="rgba(200,255,200,0.3)" />
                            <stop offset="50%" stopColor="rgba(200,200,255,0.3)" />
                            <stop offset="75%" stopColor="rgba(255,255,200,0.3)" />
                            <stop offset="100%" stopColor="rgba(255,200,255,0.3)" />
                        </linearGradient>
                        <filter id="bubble-filter" x="-60%" y="-60%" width="220%" height="220%">
                            <feGaussianBlur in="SourceGraphic" stdDeviation="0.3" result="soft" />
                            <feMerge>
                                <feMergeNode in="soft" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="bubble-shadow" x="-60%" y="-60%" width="220%" height="220%">
                            <feDropShadow
                                dx="0"
                                dy="10"
                                stdDeviation="10"
                                floodColor="rgba(0,0,0,0.28)"
                            />
                        </filter>
                    </defs>

                    <g filter="url(#bubble-shadow)">
                        <circle
                            ref={circleRef}
                            cx="50"
                            cy="50"
                            r="48"
                            fill="url(#natural-bubble-grad)"
                            stroke="url(#subtle-rainbow)"
                            strokeWidth="1"
                            filter="url(#bubble-filter)"
                        />
                        <ellipse cx="40" cy="36" rx="12" ry="7" fill="rgba(255,255,255,0.4)" />
                        <circle cx="45" cy="32" r="2" fill="rgba(255,255,255,0.5)" />
                        <circle cx="60" cy="42" r="1.5" fill="rgba(255,255,255,0.3)" />
                        <circle cx="35" cy="55" r="1.2" fill="rgba(255,255,255,0.25)" />
                    </g>
                </svg>
            </div>

            {/* 팝 파편 */}
            <div
                className="particles-container"
                style={{ '--origin-x': origin.x, '--origin-y': origin.y }}
            >
                {showParticles && generateParticles()}
            </div>

            <div className="shape"></div>
        </div>
    );
}
