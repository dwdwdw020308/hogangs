import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// 최종 프레임(작아짐)
const FINAL_W = 462;
const FINAL_H = 637;
const FINAL_R = 400;

// 이미지
const LARGE_IMG = '/about/about_visual.png';
const SMALL_IMG = '/about/Brandstory.png';

// 이미지 프레이밍
const OBJ_POS_LARGE = '50% 50%';
const OBJ_POS_SMALL = '50% 50%';

// 스크롤 임계
const THRESHOLD_GRID   = 0.65;
const WAVE_PROGRESS    = 0.92;
const TEXT_SHOW_START  = 0.70;
const TEXT_SHOW_END    = 1.00;

// ===== 로딩처럼 통통 튀는 파라미터 =====
// (GIF 느낌 기준치: 앰플 14px, 문자간 딜레이 0.08s, 총주기 ~1s)
const BOUNCE_AMPL  = 14;   // 높이(진폭). 더 세게면 18~24
const B_UP         = 0.28; // 올라가는 시간
const B_PEAK_HOLD  = 0.18; // 꼭대기 머무름(약간의 반동)
const B_DOWN       = 0.24; // 바닥으로 복귀
const STEP_FLOW    = 0.08; // 문자 간 시작 딜레이(로딩 느낌 핵심)
const REPEAT_WAVE  = 0;    // -1 주면 무한(로딩처럼 계속), 0이면 한 번만

// 완전 ‘한 글자 끝나고 다음’ 모드 원하면 true
const SEQUENTIAL   = false; // false = 로딩처럼 겹쳐 흐름 / true = 완전 순차
const TOTAL_ONE    = B_UP + B_PEAK_HOLD + B_DOWN; // 한 글자 왕복 총시간
// ======================================

export default function Content1() {
  const sectionRef  = useRef(null);
  const stageRef    = useRef(null);
  const frameRef    = useRef(null);
  const imgBigRef   = useRef(null);
  const imgSmallRef = useRef(null);
  const leftRef     = useRef(null);
  const rightRef    = useRef(null);

  const visibleRef  = useRef(false);
  const wavedOnceRef = useRef(false);
  const waveTweenRef = useRef(null);  // 무한 모드 정지용

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const stage   = stageRef.current;
    const frame   = frameRef.current;
    const imgBig  = imgBigRef.current;
    const imgS    = imgSmallRef.current;
    const left    = leftRef.current;
    const right   = rightRef.current;
    if (!section || !stage || !frame || !imgBig || !imgS || !left || !right) return;

    // 1) 문자 분해(래퍼 보존형: .accent 유지)
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
            if ((n).classList?.contains?.('ch')) continue;
            walk(n);
          }
        }
      };
      walk(el);
    };
    splitPreserve(left);
    splitPreserve(right);

    // 2) 초기 세팅
    gsap.set(stage, { yPercent: 0 });
    gsap.set(frame, { width: '100%', borderRadius: '0px' });
    gsap.set(imgBig, { autoAlpha: 1, objectPosition: OBJ_POS_LARGE });
    gsap.set(imgS,   { autoAlpha: 0, objectPosition: OBJ_POS_SMALL });
    gsap.set([left, right], { autoAlpha: 0, y: 0 });

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

    // 3) 메인 TL
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

          stage.classList.toggle('with-sides', p >= THRESHOLD_GRID);

          if (p >= TEXT_SHOW_START && p <= TEXT_SHOW_END) showText();
          else hideText();

          if (p >= WAVE_PROGRESS && !wavedOnceRef.current) {
            wavedOnceRef.current = true;
            startWave(); // 시작
          }
        },
        onLeaveBack() {
          stage.classList.remove('with-sides');
          hideText();
          // 위로 올라가면 웨이브 다시 허용
          wavedOnceRef.current = false;
          // 무한 모드면 멈춤
          if (waveTweenRef.current) {
            waveTweenRef.current.kill();
            waveTweenRef.current = null;
          }
        },
      },
      defaults: { ease: 'power2.inOut' },
    });

    tl.fromTo(stage, { yPercent: -10 }, { yPercent: 0, duration: 1.0 }, 0);
    tl.to(frame, {
      width: FINAL_W, height: FINAL_H, borderRadius: `${FINAL_R}px`, duration: 1.2
    }, 0);
    tl.to(imgBig, { autoAlpha: 0, duration: 0.6 }, 0.45);
    tl.to(imgS,   { autoAlpha: 1, duration: 0.6 }, 0.45);

    // 4) 로딩느낌 웨이브 시작
    function startWave() {
      const leftChars  = Array.from(left.querySelectorAll('.ch'));
      const rightChars = Array.from(right.querySelectorAll('.ch'));
      const seq = leftChars.concat(rightChars); // 왼 → 오 (반대로면 reverse() 쓰거나 stagger.from:'end')

      gsap.killTweensOf(seq);
      gsap.set(seq, { z: 0.01, force3D: true, y: 0 });

      const eachDelay = SEQUENTIAL ? TOTAL_ONE : STEP_FLOW;

      waveTweenRef.current = gsap.to(seq, {
        keyframes: [
          { y: -BOUNCE_AMPL,          duration: B_UP,        ease: 'power2.out'  },
          { y: -BOUNCE_AMPL * 0.35,   duration: B_PEAK_HOLD, ease: 'sine.inOut'  },
          { y: 0,                     duration: B_DOWN,      ease: 'power1.out'  },
        ],
        stagger: { each: eachDelay, from: 'start' },
        repeat: REPEAT_WAVE,            // -1이면 로딩처럼 무한
        repeatDelay: SEQUENTIAL ? 0.02 : 0, // 순차 모드일 땐 약간 숨 고르기
        overwrite: 'auto',
      });
    }

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      if (waveTweenRef.current) waveTweenRef.current.kill();
      ScrollTrigger.getAll().forEach(s => s.kill());
    };
  }, []);

  return (
    <section id="content1" ref={sectionRef}>
      <div className="stage" ref={stageRef}>
        {/* with-reflect 붙이면 반사 켬(아래 SCSS) */}
        <h2 className="side left with-reflect"  ref={leftRef}>
          <span className="accent">호강의</span>&nbsp;시작
        </h2>

        <figure className="hero-frame" ref={frameRef}>
          <img ref={imgBigRef}   className="img-big"   src={LARGE_IMG}  alt="호강스 비주얼" />
          <img ref={imgSmallRef} className="img-small" src={SMALL_IMG}  alt="브랜드 스토리" />
        </figure>

        <h2 className="side right with-reflect" ref={rightRef}>
          <span className="accent">호강스</span>에서
        </h2>
      </div>
    </section>
  );
}
