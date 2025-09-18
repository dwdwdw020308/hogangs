import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
    const rootRef = useRef(null);
    const leftDoorRef = useRef(null);
    const rightDoorRef = useRef(null);
    const titleRef = useRef(null);
    const descRef = useRef(null);
    const videoWrapRef = useRef(null); // 핀 걸 요소(컨테이너)
    const videoRef = useRef(null); // 등장 애니메이션용(프레임)

    useLayoutEffect(() => {
        if (!rootRef.current) return;

        const ctx = gsap.context(() => {
            // ===== 초기 상태 =====
            gsap.set([leftDoorRef.current, rightDoorRef.current], {
                xPercent: 0,
                opacity: 1,
                willChange: 'transform, opacity',
            });
            gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 20 });
            gsap.set(videoRef.current, { opacity: 0, y: 30 });

            // ===== 1) 섹션 전체 핀: 문 오픈 + 텍스트 + 영상 프레임 등장 =====
            const openTl = gsap.timeline({
                scrollTrigger: {
                    trigger: rootRef.current,
                    start: 'top top',
                    end: '+=120%',
                    scrub: 1,
                    pin: true,
                    anticipatePin: 1,
                    // markers: true,
                },
                defaults: { ease: 'power3.out' },
            });

            openTl
                // 문 열기(살짝 바운스)
                .to(leftDoorRef.current, { xPercent: -100, duration: 1 }, 0)
                .to(rightDoorRef.current, { xPercent: 100, duration: 1 }, 0)
                .to(leftDoorRef.current, { xPercent: -94, duration: 0.25 }, '>-0.1')
                .to(leftDoorRef.current, { xPercent: -100, duration: 0.25 }, '>-0.02')
                .to(rightDoorRef.current, { xPercent: 94, duration: 0.25 }, '<')
                .to(rightDoorRef.current, { xPercent: 100, duration: 0.25 }, '>-0.02')
                .to(
                    [leftDoorRef.current, rightDoorRef.current],
                    { opacity: 0, duration: 0.4 },
                    '>-0.1'
                )

                // 컨텐츠 등장
                .to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.25')
                .to(descRef.current, { opacity: 1, y: 0, duration: 0.6 }, '<0.1')
                .to(videoRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2');

            // ===== 2) 영상 구간 핀: "아래로 스크롤할 때만" 활성 + 바닥 정렬(시각적)
            //   - 핀은 기본적으로 상단에 걸리므로 start:'top top'
            //   - 시각적 바닥 정렬은 SCSS의 .video { min-height:100vh; display:flex; justify-content:flex-end; }로 처리

            // (A) 실제 핀 트리거 — 기본 비활성
            const pinST = ScrollTrigger.create({
                trigger: videoWrapRef.current,
                start: 'top top', // 핀 기준은 top(기본), 바닥 정렬은 CSS로 해결
                end: '+=250%', // 붙잡는 길이 (원하면 늘려)
                pin: true,
                pinSpacing: true,
                anticipatePin: 1,
                enabled: false, // ★ 아래로 내려왔을 때만 켤 거라 기본 off
                // markers: true,
            });

            // (B) 게이트 트리거 — 방향 기반 on/off
            ScrollTrigger.create({
                trigger: videoWrapRef.current,
                start: 'top top',
                end: 'bottom center',
                // markers: true,
                onEnter: () => {
                    // ↓ 아래로 내려와 진입
                    pinST.enable();
                    pinST.refresh(); // 깜빡임 방지
                },
                onLeave: () => {
                    // ↓ 더 내려가면 해제
                    pinST.disable(false); // false: pinSpacing 유지 (레이아웃 안정)
                },
                onEnterBack: () => {
                    // ↑ 위로 돌아올 땐 안 걸리게
                    pinST.disable(false);
                },
                onLeaveBack: () => {
                    // ↑ 완전히 위로 나가면 유지
                    pinST.disable(false);
                },
            });

            // 필요 시 리프레시
            ScrollTrigger.refresh();
        }, rootRef);

        return () => ctx.revert();
    }, []);

    return (
        <section id="section3" ref={rootRef}>
            {/* 좌/우 문 (이미지) */}
            <div
                className="s3-door s3-door--left s3-door--img"
                ref={leftDoorRef}
                aria-hidden="true"
            />
            <div
                className="s3-door s3-door--right s3-door--img"
                ref={rightDoorRef}
                aria-hidden="true"
            />

            <div className="inner">
                <div className="textcontent">
                    <h2 ref={titleRef}>PawFlix</h2>
                    <p ref={descRef}>소중한 반려견과 함께하는 달콤한 휴식</p>
                </div>
            </div>

            {/* 영상 래퍼: 이 요소에 pin을 건다 */}
            <div className="video" ref={videoWrapRef}>
                <div className="video-frame" ref={videoRef}>
                    <video
                        src="/main/dog.mp4"
                        loop
                        muted
                        autoPlay
                        playsInline
                        controls
                        width="1800"
                        height="817"
                    />
                </div>
            </div>
        </section>
    );
}
