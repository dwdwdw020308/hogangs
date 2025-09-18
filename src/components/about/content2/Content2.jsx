import React, { useLayoutEffect, useRef, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
    const rootRef = useRef(null);

    useEffect(() => {
        AOS.init({ duration: 800, easing: 'ease-out', once: false, offset: 0 });
        AOS.refresh();
    }, []);

    useLayoutEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        // 1) .textline만 선택
        const lines = Array.from(root.querySelectorAll('.texttitle .textline'));

        // 유틸: 배열 셔플 (랜덤 스태거용)
        const shuffle = (arr) => {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        };

        // 2) 각 .textline을 “단어 span + 공백 보존”으로 재구성
        lines.forEach((line) => {
            if (line.dataset.split === 'done') return;

            const original = line.textContent; // ★ trim() 하지 말 것! (앞/뒤 공백도 살릴 수 있게)
            line.setAttribute('aria-label', original);
            line.textContent = '';

            // "단어"와 "공백(연속 스페이스 포함)"을 모두 토큰으로 분리
            // 예: "안녕   세상" -> ["안녕", "   ", "세상"]
            const tokens = original.split(/(\s+)/);

            // 단어 인덱스 배열(지연 랜덤화용) 만들기
            const wordIndices = tokens.map((t, i) => ({ i, t })).filter((x) => x.t.trim() !== ''); // 공백 제외
            const order = shuffle(wordIndices.map((x, idx) => idx));

            let wordCounter = 0;

            tokens.forEach((tok) => {
                if (tok.trim() === '') {
                    // 공백 토큰: &nbsp;로 길이만큼 재생성(연속 스페이스 보존)
                    const nbsp = '\u00A0'.repeat(tok.length);
                    // 텍스트 노드로 그냥 넣어도 됨(부모 white-space: normal이라도 NBSP는 보존됨)
                    line.appendChild(document.createTextNode(nbsp));
                } else {
                    // 단어 토큰: 애니메이션 span
                    const span = document.createElement('span');
                    span.className = 'word';
                    span.style.setProperty('--i', String(order[wordCounter] ?? 0));
                    span.textContent = tok;
                    line.appendChild(span);
                    wordCounter += 1;
                }
            });

            line.dataset.split = 'done';
        });

        // 3) 스크롤 진입 시에만 애니메이션 켜기 (is-in 클래스 토글)
        const triggers = lines.map((el) =>
            ScrollTrigger.create({
                trigger: el,
                start: 'top 85%',
                end: 'bottom 20%',
                onEnter: () => el.classList.add('is-in'),
                onLeaveBack: () => el.classList.remove('is-in'),
                // markers: true,
            })
        );

        return () => {
            triggers.forEach((t) => t.kill());
        };
    }, []);

    return (
        <section id="content2" ref={rootRef}>
            <div className="slogan">
                <img src="/about/TitleBox.png" alt="" />
                <span
                    data-aos="fade-up"
                    data-aos-delay="200" // 0.2초 후 실행
                    data-aos-duration="2000"
                    data-aos-easing="ease-out"
                >
                    HOGANGS
                </span>
                <h3
                    data-aos="fade-up"
                    data-aos-delay="600" // 0.6초 후 실행 (span보다 늦게)
                    data-aos-duration="2000"
                    data-aos-easing="ease-out"
                >
                    Brandstory
                </h3>
            </div>

            <ul className="texttitle">
                <li className="textline">
                    호강스는 ‘반려견도 가족이다’ 라는 마음으로 시작되었습니다.
                </li>
                <li className="textline">
                    우리 아이가 집처럼 편안하게 머물고, 보호자가 안심할 수 있는 공간을 만들고자
                    합니다.
                </li>
                <li className="textline">
                    맞춤형 호텔 서비스와 전문적인 미용을 통해 단순한 돌봄이 아닌 특별한 경험을
                    제공합니다.
                </li>
                <li className="textline">
                    작은 발자국 하나에도 행복이 묻어나는 순간, 호강스는 반려견과 보호자가 함께하는
                    모든 시간을 더욱 특별하게 만듭니다.
                </li>
            </ul>

            <div className="dogicon">
                <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
                    <img src="/about/01.png" alt="" />
                </span>
                <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
                    <img src="/about/02.png" alt="" />
                </span>
                <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
                    <img src="/about/03.png" alt="" />
                </span>
            </div>
        </section>
    );
};

export default Content2;
