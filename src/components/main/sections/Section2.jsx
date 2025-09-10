import { useLayoutEffect, useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import AOS from 'aos';

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);
    const [isInitialized, setIsInitialized] = useState(false);

    useLayoutEffect(() => {
        // 요소가 아직 DOM에 없을 수 있으므로 확인
        if (!sectionRef.current || !bgRef.current) return;

        const ctx = gsap.context(() => {
            const timeline = gsap
                .timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top top',
                        end: '+=200%',
                        scrub: true,
                        pin: true,
                        anticipatePin: 1,
                        pinSpacing: true,
                        markers: false,
                        // id를 추가하여 추적하기 쉽게 함
                        id: 'section2-pin',
                    },
                })
                .fromTo(
                    bgRef.current,
                    { opacity: 0, scale: 0.6, filter: 'blur(6px)' },
                    { opacity: 1, scale: 1.8, filter: 'blur(0px)', ease: 'none' }
                );

            // 타임라인 참조 저장
            return timeline;
        }, sectionRef);

        return () => {
            // 모든 ScrollTrigger 인스턴스 제거
            ScrollTrigger.getAll().forEach((trigger) => {
                if (trigger.trigger === sectionRef.current) {
                    trigger.kill();
                }
            });
            ctx.revert();
        };
    }, []);

    useEffect(() => {
        // AOS 한 번만 초기화
        if (!isInitialized && typeof AOS !== 'undefined') {
            AOS.init({
                duration: 500,
                easing: 'ease-out',
                once: true,
                offset: 0,
                disable: window.innerWidth < 768,
            });
            setIsInitialized(true);
        }

        return () => {
            // AOS 관련 이벤트 리스너 제거
            if (typeof AOS !== 'undefined') {
                AOS.refreshHard();
            }
        };
    }, [isInitialized]);

    return (
        <section ref={sectionRef} className="reveal-pin-wrap">
            <div ref={bgRef} className="reveal-pin-bg" />
            <div className="reveal-pin-content">
                <h1
                    className="eyebrow"
                    data-aos="fade-up"
                    data-aos-duration="1400"
                    data-aos-delay="1600"
                >
                    뽀송뽀송
                </h1>
                <p
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="1500"
                    className="headline"
                >
                    호강이 되는 시간
                </p>
                <span
                    data-aos="fade-up"
                    data-aos-duration="1000"
                    data-aos-delay="1600"
                    className="endtext"
                >
                    Brand story
                </span>
            </div>
        </section>
    );
}
