import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section2() {
    const sectionRef = useRef(null);
    const bgRef = useRef(null);

    // 3D 텍스트 교차용
    const swapRef = useRef(null);
    const stageRef = useRef(null);
    const outRef = useRef(null);
    const inRef = useRef(null);

    // (1) 더 긴 문구 기준 사이즈 고정
    useLayoutEffect(() => {
        if (!swapRef.current || !stageRef.current) return;

        let rafId = 0;
        let tId = 0;

        const measure = () => {
            // 🔒 널 가드 (복붙으로 다른 섹션에서 오류 방지)
            if (!outRef.current || !inRef.current || !swapRef.current || !stageRef.current) return;
            const r1 = outRef.current.getBoundingClientRect?.();
            const r2 = inRef.current.getBoundingClientRect?.();
            if (!r1 || !r2) return;

            const maxW = Math.max(r1.width, r2.width);
            const maxH = Math.max(r1.height, r2.height);
            swapRef.current.style.width = `${Math.ceil(maxW)}px`;
            swapRef.current.style.height = `${Math.ceil(maxH)}px`;
            stageRef.current.style.width = `${Math.ceil(maxW)}px`;
            stageRef.current.style.height = `${Math.ceil(maxH)}px`;
        };

        const afterFonts = () => {
            rafId = requestAnimationFrame(measure);
        };

        if (document.fonts?.ready) {
            document.fonts.ready.then(afterFonts);
        } else {
            afterFonts();
            tId = window.setTimeout(measure, 60);
        }

        const onResize = () => measure();
        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            if (rafId) cancelAnimationFrame(rafId);
            if (tId) clearTimeout(tId);
        };
    }, []);

    // (2) GSAP: 메인 스크럽 타임라인 + "끝 지점에서만" 리빌
    useLayoutEffect(() => {
        if (!sectionRef.current || !bgRef.current) return;

        const ctx = gsap.context(() => {
            // ── 메인 스크럽 타임라인
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                    pinSpacing: true,
                    markers: false,
                    id: 'section2-pin',
                },
            });

            // 배경
            tl.fromTo(
                bgRef.current,
                { opacity: 0, scale: 0.6, filter: 'blur(6px)' },
                { opacity: 1, scale: 1.8, filter: 'blur(0px)', ease: 'none' },
                0
            );

            // 3D 플립 초기값
            if (outRef.current && inRef.current) {
                gsap.set([outRef.current, inRef.current], { transformOrigin: 'bottom center' });
                gsap.set(outRef.current, {
                    rotateX: 0,
                    autoAlpha: 1,
                    yPercent: 0,
                    filter: 'blur(0px)',
                });
                gsap.set(inRef.current, {
                    rotateX: -90,
                    autoAlpha: 0,
                    yPercent: 8,
                    filter: 'blur(2px)',
                });

                tl.addLabel('swap', 0.42);
                tl.to(
                    outRef.current,
                    {
                        rotateX: 90,
                        yPercent: -8,
                        autoAlpha: 0,
                        filter: 'blur(2px)',
                        ease: 'none',
                        duration: 0.24,
                    },
                    'swap'
                );
                tl.to(
                    inRef.current,
                    {
                        rotateX: 0,
                        yPercent: 0,
                        autoAlpha: 1,
                        filter: 'blur(0px)',
                        ease: 'none',
                        duration: 0.24,
                    },
                    'swap'
                );
            }

            // ── 끝에서만 리빌(AOS 대체): 별도 트리거 (addEventListener 쓰지 말고!)
            const endTargets = gsap.utils.toArray('.reveal-on-end');
            gsap.set(endTargets, { autoAlpha: 0, y: 16, scale: 0.98 });

            // 섹션의 바닥이 뷰포트 바닥에 닿는 "그 순간"만 실행
            const endTrigger = ScrollTrigger.create({
                trigger: sectionRef.current,
                start: 'bottom bottom',
                end: 'bottom bottom',
                onEnter: () => {
                    gsap.to(endTargets, {
                        autoAlpha: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.7,
                        ease: 'power2.out',
                        stagger: 0.08,
                        overwrite: 'auto',
                    });
                },
                onLeaveBack: () => {
                    // 위로 되감으면 다시 숨김 → 끝에서만 보이게
                    gsap.set(endTargets, { autoAlpha: 0, y: 16, scale: 0.98 });
                },
            });

            // 필요시 디버그 마커
            // endTrigger.vars.markers = true;
            // endTrigger.refresh();
        }, sectionRef);

        return () => {
            ScrollTrigger.getAll().forEach((st) => {
                if (st.trigger === sectionRef.current) st.kill();
            });
            ctx.revert();
        };
    }, []);

    return (
        <section ref={sectionRef} className="reveal-pin-wrap">
            <div ref={bgRef} className="reveal-pin-bg" />
            <div className="reveal-pin-content">
                <h1 className="eyebrow reveal-on-end">뽀송뽀송</h1>

                {/* ▼ 3D 텍스트 교차 */}
                <div className="swap3d reveal-on-end" ref={swapRef}>
                    <div className="swap3d__sizer">행복이 되는 시간</div>
                    <div className="swap3d-stage" ref={stageRef}>
                        <p className="pane pane--out" ref={outRef}>
                            호강이 되는 시간
                        </p>
                        <p className="pane pane--in" ref={inRef}>
                            행복이 되는 시간
                        </p>
                    </div>
                </div>

                <span className="endtext reveal-on-end">Brand story</span>
            </div>
        </section>
    );
}
