import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLayoutEffect, useRef } from 'react';
import BgFixed from '../BgFixed';
gsap.registerPlugin(ScrollTrigger);

const Section1 = () => {
    const gsapRef = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const $ = gsap.utils.selector(gsapRef);

            const tl = gsap.timeline({
                defaults: { ease: 'none', duration: 1 },
                scrollTrigger: {
                    trigger: gsapRef.current,
                    start: 'top top',
                    end: '+=2400',
                    onEnter: () => gsap.to('#bg-fixed', { autoAlpha: 1, duration: 0.3 }),
                    onLeaveBack: () => gsap.to('#bg-fixed', { autoAlpha: 0, duration: 0.3 }),
                    markers: true,
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            });

            return () => ctx.revert();
        });
    }, []);

    return (
        <>
            <BgFixed />
            <section id="section1" ref={gsapRef}>
                section1 입니다
            </section>
        </>
    );
};

export default Section1;
