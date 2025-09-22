// HeadLine.jsx
import gsap from 'gsap';
import { useLayoutEffect, useRef } from 'react';

const HeadLine = () => {
    const svgRef = useRef(null);
    const textRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            // 각 글자 <tspan.char> 선택
            const chars = textRef.current?.querySelectorAll('tspan.char');
            if (!chars?.length) return;

            // 초기: 대각선(왼쪽 위) + 투명
            // tspan에는 transform보다 dx/dy 쓰는 게 호환성/안전함
            gsap.set(chars, {
                opacity: 0,
                attr: { dx: 14, dy: 14 },
            });

            // 한 글자씩 스태거로 대각선→제자리 + 페이드
            gsap.to(chars, {
                opacity: 1,
                attr: { dx: 0, dy: 0 },
                duration: 0.6,
                ease: 'power3.out',
                stagger: 0.08,
            });
        }, svgRef);

        return () => ctx.revert();
    }, []);

    // 문자열을 글자당 <tspan class="char">로 쪼개기
    const wrapChars = (str) =>
        str.split('').map((ch, i) => (
            <tspan className="char" key={i}>
                {ch === ' ' ? '\u00A0' : ch}
            </tspan>
        ));

    return (
        <svg
            className="main_headline"
            xmlns="http://www.w3.org/2000/svg"
            width="909"
            height="266"
            viewBox="0 0 909 266"
            ref={svgRef}
            style={{ overflow: 'visible' }}
        >
            {/* 곡선 경로(보이지 않음) */}
            <path
                id="curve"
                d="M1.27655 88.3507C27.6582 69.5746 90.9778 30.285 133.203 23.3358C185.984 14.6493 302.393 5.27279 320.615 2.14725C338.836 -0.978292 436.646 3.01146 484.222 47.3055C531.798 91.5995 554.666 163.847 605.076 181.659C655.487 199.471 731.552 226.586 801.811 222.343C872.07 218.099 900.34 244.59 907.943 265"
                stroke="none"
                fill="none"
            />

            {/* 텍스트 */}
            <text
                ref={textRef}
                fontSize="76"
                fontWeight="700"
                fontFamily="Paperlogy"
                fill="#ffffff"
            >
                <textPath href="#curve" startOffset="5%">
                    {/* 일반 흰색 파트 */}
                    <tspan>{wrapChars('우리 댕댕이의 ')}</tspan>
                    <tspan>{wrapChars('특별한')}</tspan>

                    {/* 민트색 파트: 부모 tspan에 fill 주고 내부 글자도 tspan(char)로 */}
                    <tspan fill="#94E4DF">{wrapChars(' 휴가')}</tspan>

                    {/* 마무리 */}
                    <tspan>{wrapChars(' 시작!')}</tspan>
                </textPath>
            </text>
        </svg>
    );
};

export default HeadLine;
