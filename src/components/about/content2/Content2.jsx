import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
    useEffect(() => {
        // 1) DOM 선택
        const section = document.querySelector('#content2');
        const list = document.querySelector('#content2 .texttitle');
        const lines = document.querySelectorAll('#content2 .texttitle li');

        // 2) SCSS 못 바꾸므로 JS로 레이아웃/타이포 강제 세팅
        gsap.set(section, {
            height: '100vh', // pin 섹션은 한 화면
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '0 10vw', // 세로 padding 제거 효과
            overflow: 'hidden',
            boxSizing: 'border-box',
            backgroundColor: '#fff',
        });

        if (list) {
            gsap.set(list, {
                margin: 0,
                padding: 0,
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                rowGap: '0vh',
            });
        }

        lines.forEach((el) => {
            gsap.set(el, {
                fontWeight: 700,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundSize: '200% 100%',
                backgroundPosition: '100% 0',
                willChange: 'background-position',
            });
        });

        // 4) ScrollTrigger 애니메이션
        const liDistance = 500; // li 하나당 진행 구간(px) — 필요시 400~600 조정
        const totalDistance = Math.max(lines.length * liDistance, 800); // 너무 짧지 않게 최소 확보

        gsap.fromTo(
            lines,
            { backgroundPosition: '100% 0' }, // 시작(회색)
            {
                backgroundPosition: '0% 0', // 끝(검정이 왼→오로 채움)
                ease: 'none',
                stagger: 1, // 줄마다 순차 진행
                scrollTrigger: {
                    trigger: section,
                    start: 'top top', // 내려올 때 자연스레 시작
                    end: `+=${totalDistance}`, // pin 유지 거리 (li 개수 기반)
                    scrub: true,
                    pin: true,
                    anticipatePin: 1,
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach((st) => st.kill());
        };
    }, []);

    useEffect(() => {
        AOS.init({ duration: 500, easing: 'ease-out', once: false, offset: 0 });
        AOS.refresh();
    }, []);

    return (
        <section id="content2">
            <div className="slogan">
                <img
                    data-aos="fade-up"
                    data-aos-easing="linear"
                    data-aos-duration="500"
                    src="/about/TitleBox.png"
                    alt=""
                />
            </div>

            <ul className="texttitle">
                <li className="textline">
                    호강스는 ‘반려견도 가족이다’라는 마음으로 시작되었습니다.
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
