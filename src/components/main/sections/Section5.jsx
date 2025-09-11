import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
    const sectionRef = useRef(null);
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=100%',
                    scrub: true,
                    pin: true,
                },
            });

            // 이미지1: 1800x864 → 890x890 (좌측으로 이동)
            tl.to(img1Ref.current, {
                width: 890,
                height: 890,
                x: '-455px', // 절반 이동해서 좌측 카드처럼
                ease: 'power2.out',
            });

            // 이미지2: 0 → 890x890 (우측 카드로 등장)
            tl.fromTo(
                img2Ref.current,
                { width: 0, height: 0, opacity: 0 },
                { width: 890, height: 890, opacity: 1, ease: 'power2.out' },
                '<'
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="section5" ref={sectionRef} className="about-sec1">
            <div className="text">
                <p>Instagram</p>
                <h2>오늘도 예쁘개 찰칵</h2>
            </div>
            <div className="horiz-layout">
                {/* 처음엔 큰 이미지 */}
                <div className="card" ref={img1Ref}>
                    <img src="/main/section5_img1.png" alt="강아지 1" />
                    <h3>hogangs</h3>
                </div>

                {/* 두 번째 이미지는 나중에 등장 */}
                <div className="card" ref={img2Ref}>
                    <img src="/main/section5_img2.png" alt="강아지 2" />
                    <h3>@hogangs</h3>
                </div>
            </div>
        </section>
    );
};

export default Section5;
