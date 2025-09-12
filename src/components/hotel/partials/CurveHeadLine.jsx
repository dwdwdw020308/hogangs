import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CurveHeadLine = () => {
    const tpRef = useRef(null);
    const svgRef = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tp = tpRef.current;

            gsap.fromTo(
                tp,
                { attr: { startOffset: '-200%' }, opacity: 0, letterSpacing: 2 },
                {
                    attr: { startOffset: '28%' },
                    opacity: 1,
                    letterSpacing: 0.5,
                    duration: 1.5,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: svgRef.current,
                        start: 'top bottom',
                        end: 'top 20%',
                        // markers: true,
                        once: true,
                    },
                }
            );

            return () => ctx.revert();
        }, svgRef);
    }, []);

    return (
        <svg
            className="headline"
            ref={svgRef}
            width="1200"
            viewBox="0 0 1200 100"
            role="img"
            aria-label="호강할 준비, 됐개?"
        >
            <path id="curve" d="M80,180 C380,20 820,20 1120,180" fill="none" />

            <text fontSize="68" fontWeight="700" fontFamily="Paperlogy">
                <textPath ref={tpRef} href="#curve" startOffset="0%">
                    {/* 부분 색상 분리 */}
                    <tspan fill="#060606">호강</tspan>
                    <tspan fill="#4A9F99">할 준비, 됐개?</tspan>
                </textPath>
            </text>
        </svg>
    );
};

export default CurveHeadLine;
