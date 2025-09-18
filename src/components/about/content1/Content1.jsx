import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 최종 프레임(작아짐)
const FINAL_W = 462;
const FINAL_H = 637;
const FINAL_R = 400;

// 이미지
const LARGE_IMG = '/about/about_visual.png'; // 풀배경(여백 X)
const SMALL_IMG = '/about/Brandstory.png'; // 프레임 안(잘림 X)
const TEXT_GIF = '/about/hobock.gif';
const TEXT_GIF2 = '/about/hogang.gif';

export default function Content1() {
    const sectionRef = useRef(null);
    const stageRef = useRef(null);
    const frameRef = useRef(null);
    const bgRef = useRef(null); // ★ 큰 이미지 배경 레이어
    const imgSmallRef = useRef(null);
    const leftRef = useRef(null);
    const rightRef = useRef(null);

    const visibleRef = useRef(false);
    const wavedOnceRef = useRef(false);
    const waveTweenRef = useRef(null);

    const gifRef1 = useRef(null);
    const gifRef2 = useRef(null);

    useLayoutEffect(() => {
        const gif1 = gifRef1.current;
        const gif2 = gifRef2.current;
        const section = sectionRef.current;
        const stage = stageRef.current;
        const frame = frameRef.current;
        const bg = bgRef.current;
        const imgS = imgSmallRef.current;
        const left = leftRef.current;
        const right = rightRef.current;
        if (!section || !stage || !frame || !bg || !imgS || !left || !right) return;

        // 글자 쪼개기
        const splitPreserve = (el) => {
            if (!el || el.querySelector('.ch')) return;
            const walk = (node) => {
                for (const n of Array.from(node.childNodes)) {
                    if (n.nodeType === 3) {
                        const text = n.nodeValue ?? '';
                        const frag = document.createDocumentFragment();
                        for (const ch of text) {
                            const s = document.createElement('span');
                            s.className = 'ch';
                            s.textContent = ch === ' ' ? '\u00A0' : ch;
                            frag.appendChild(s);
                        }
                        n.replaceWith(frag);
                    } else if (n.nodeType === 1) {
                        if (n.classList?.contains?.('ch')) continue;
                        walk(n);
                    }
                }
            };
            walk(el);
        };
        splitPreserve(left);
        splitPreserve(right);

        // 초기 상태
        gsap.set(stage, { yPercent: 0 });
        gsap.set(bg, { autoAlpha: 1 }); // 큰 이미지(배경) 보이기
        gsap.set(frame, { width: '100%', borderRadius: 0 });
        gsap.set(imgS, { autoAlpha: 0 });
        gsap.set([left, right], { autoAlpha: 0 });
        gsap.set([gif1, gif2], { autoAlpha: 1 });

        const showText = () => {
            if (visibleRef.current) return;
            visibleRef.current = true;
            gsap.to([left, right], { autoAlpha: 1, duration: 0.12, overwrite: 'auto' });
        };
        const hideText = () => {
            if (!visibleRef.current) return;
            visibleRef.current = false;
            gsap.to([left, right], { autoAlpha: 0, duration: 0.12, overwrite: 'auto' });
        };

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top top',
                end: '+=160%',
                scrub: 1.2,
                pin: true,
                anticipatePin: 1,
                // markers: true,
                onUpdate(self) {
                    const p = self.progress;
                    stage.classList.toggle('with-sides', p >= 0.65);
                    if (p >= 0.7 && p <= 1) showText();
                    else hideText();
                    if (p >= 0.92) {
                        if (!wavedOnceRef.current) {
                            wavedOnceRef.current = true;
                            startWave();
                            // show-dots클래스
                            const accentEls = section.querySelectorAll('.accent');
                            accentEls.forEach((el) => el.classList.add('show-dots'));
                        }
                    } else {
                        wavedOnceRef.current = false;
                        // show-dots클래스
                        const accentEls = section.querySelectorAll('.accent');
                        accentEls.forEach((el) => el.classList.remove('show-dots'));
                    }
                },
                onLeaveBack() {
                    stage.classList.remove('with-sides');
                    hideText();
                    wavedOnceRef.current = false;
                    if (waveTweenRef.current) {
                        waveTweenRef.current.kill();
                        waveTweenRef.current = null;
                    }
                },
            },
            defaults: { ease: 'power2.inOut' },
        });

        // 스테이지 약간 내려오면서
        tl.fromTo(stage, { yPercent: -10 }, { yPercent: 0, duration: 1.0 }, 0);

        // 프레임 축소(타원) + 작은 이미지 등장
        tl.to(
            frame,
            {
                width: FINAL_W,
                height: FINAL_H,
                borderRadius: `${FINAL_R}px`,
                duration: 1.2,
            },
            0
        );

        // 큰 이미지 배경 페이드아웃(밑 여백 X, 그냥 사라지기만 함)
        tl.to(bg, { autoAlpha: 0, duration: 0.6 }, 0.45);

        // 작은 이미지 페이드인(프레임 안에서 contain)
        tl.to(imgS, { autoAlpha: 1, duration: 0.6 }, 0.45);

        if (gif1 && gif2) {
            tl.to([gif1, gif2], { autoAlpha: 0, duration: 0.6 }, 0.2);
        }

        function startWave() {
            const leftChars = Array.from(left.querySelectorAll('.ch'));
            const rightChars = Array.from(right.querySelectorAll('.ch'));
            const seq = leftChars.concat(rightChars);

            gsap.killTweensOf(seq);
            gsap.set(seq, { y: 0 });
            waveTweenRef.current = gsap.to(seq, {
                keyframes: [
                    { y: -14, duration: 0.28, ease: 'power2.out' },
                    { y: -5, duration: 0.18, ease: 'sine.inOut' },
                    { y: 0, duration: 0.24, ease: 'power1.out' },
                ],
                stagger: { each: 0.08, from: 'start' },
                repeat: 0,
                overwrite: 'auto',
            });
        }

        return () => {
            tl.scrollTrigger?.kill();
            tl.kill();
            if (waveTweenRef.current) waveTweenRef.current.kill();
            ScrollTrigger.getAll().forEach((s) => s.kill());
        };
    }, []);

    return (
        <section id="content1" ref={sectionRef}>
            <div className="stage" ref={stageRef}>
                {/* ★ 큰 이미지: stage 전체를 덮는 백그라운드 레이어 */}
                <div
                    className="bg-cover"
                    ref={bgRef}
                    style={{ backgroundImage: `url(${LARGE_IMG})` }}
                    aria-hidden
                />
                <div
                    className="gif-cover1"
                    ref={gifRef1}
                    style={{ backgroundImage: `url(${TEXT_GIF})` }}
                    aria-hidden
                />
                <div
                    className="gif-cover2"
                    ref={gifRef2}
                    style={{ backgroundImage: `url(${TEXT_GIF2})` }}
                    aria-hidden
                />

                <h2 className="side left with-reflect" ref={leftRef}>
                    <span className="accent">호강</span>
                    의&nbsp;시작
                    <ul className="dots">
                        <li className="dot"></li>
                        <li className="dot"></li>
                        {/* <li className="dot"></li> */}
                    </ul>
                </h2>

                <figure className="hero-frame" ref={frameRef}>
                    {/* 작은 이미지는 프레임 안에 contain으로 */}
                    <img
                        ref={imgSmallRef}
                        className="img-small"
                        src={SMALL_IMG}
                        alt="브랜드 스토리"
                    />
                </figure>

                <h2 className="side right with-reflect" ref={rightRef}>
                    <span className="accent">호강스</span>
                    에서
                    <ul className="dots">
                        <li className="dot"></li>
                        <li className="dot"></li>
                        <li className="dot"></li>
                    </ul>
                </h2>
            </div>
            <div className="text_marquee_area">
                <div className="marquee_wrapper">
                    <div className="marquee__inner">
                        <span>Hogangs</span>
                        <span>Hogangs</span>
                        <span>Hogangs</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
