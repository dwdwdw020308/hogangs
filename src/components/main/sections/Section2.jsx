import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);

    useLayoutEffect(() => {
        const text = gsap.context(() => {
            gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=200%', // 스크롤 구간(원하는 만큼 늘려)
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    // markers: true,
                },
            }).fromTo(
                bgRef.current,
                { opacity: 0, scale: 0.8, filter: 'blur(6px)' },
                { opacity: 1, scale: 1, filter: 'blur(0px)', ease: 'none' }
            );
        }, sectionRef);
        return () => text.revert();
    }, []);

    return (
        <section ref={sectionRef} className="reveal-pin-wrap">
            <div ref={bgRef} className="reveal-pin-bg" />
            <div className="reveal-pin-content">
                <h1 className="eyebrow">뽀송뽀송</h1>
                <p className="headline">호강이 되는 시간</p>
                <span className="endtext">Brand story</span>
            </div>
        </section>
    );
}
