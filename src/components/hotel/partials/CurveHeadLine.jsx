import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useEffect, useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

const CurveHeadLine = () => {
    const tpRef = useRef(null);
    const textRef = useRef(null);
    const svgRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const tp = tpRef.current;

            gsap.set(tpRef.current, {
                attr: { startOffset: '-200%' },
            });
            gsap.set(textRef.current, { opacity: 0, letterSpacing: 2 });

            ScrollTrigger.create({
                trigger: svgRef.current,
                start: 'top 80%',
                // end: 'top 20%',
                // markers: true,

                onEnter: () => {
                    gsap.to(tpRef.current, {
                        attr: { startOffset: '28%' },
                        duration: 3,
                    });
                    gsap.to(textRef.current, { opacity: 1, letterSpacing: 0.5 });
                },
            });
        }, svgRef);
        return () => ctx.revert();
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

            <text ref={textRef} fontSize="68" fontWeight="700" fontFamily="Paperlogy">
                <textPath ref={tpRef} href="#curve" startOffset="0%">
                    {/* 부분 색상 분리 */}
                    <tspan fill="#4A9F99">호강</tspan>
                    <tspan fill="#060606 ">할 준비, 됐개?</tspan>
                </textPath>
            </text>
        </svg>
    );
};

export default CurveHeadLine;
