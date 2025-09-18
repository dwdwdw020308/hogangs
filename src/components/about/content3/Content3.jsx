import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 5000;
const slides = [
    {
        id: '01',
        title: '따뜻한 두 번째 집',
        desc: '보호자가 믿고 맡길 수 있는\n 신뢰감 있는 호텔 & 미용 서비스',
        img: '/about/doghead.png',
        focal: '50% 42%',
    },
    {
        id: '02',
        title: '귀엽고 즐거운 경험',
        desc: '강아지의 행복한 표정과\n 즐거움을 최우선으로',
        img: '/about/doghead.png',
        focal: '50% 42%',
    },
    {
        id: '03',
        title: '사랑을 담은 세심한 케어',
        desc: '단순 관리가 아닌 반려견을\n 가족처럼 아끼는 브랜드 철학',
        img: '/about/doghead.png',
        focal: '50% 42%',
    },
];

export default function Content3() {
    const [index, setIndex] = useState(0);
    const pinSectionRef = useRef(null);

    // 🚀 스크롤로 index 바꾸기
    useEffect(() => {
        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                trigger: pinSectionRef.current,
                start: 'top top',
                end: '+=300%',
                scrub: true,
                pin: true,
                // markers: true,
                onUpdate: (self) => {
                    const newIndex = Math.min(
                        slides.length - 1,
                        Math.floor(self.progress * slides.length)
                    );
                    setIndex(newIndex);
                },
            });
        }, pinSectionRef);

        return () => ctx.revert();
    }, []);

    // 🚀 자동 전환 (항상 5초마다)
    useEffect(() => {
        const t = setTimeout(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, DURATION);
        return () => clearTimeout(t);
    }, [index]);

    const { id, title, desc, img } = slides[index];

    return (
        <section id="content3" ref={pinSectionRef}>
            <div className="content-box fade" key={id}>
                <div className="visual">
                    <img
                        src={img}
                        alt=""
                        style={{ objectFit: 'cover', objectPosition: slides[index].focal }}
                    />
                </div>

                <div className="texts">
                    <strong
                        className="title"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="500"
                    >
                        {title}
                    </strong>
                    <p
                        className="desc"
                        data-aos="fade-up"
                        data-aos-duration="1000"
                        data-aos-delay="1000"
                    >
                        {desc}
                    </p>
                </div>
            </div>

            <div className="pagination">
                {slides.map(({ id }, i) => (
                    <button
                        key={id}
                        className={index === i ? 'active' : ''}
                        onClick={() => setIndex(i)}
                    >
                        <svg className="progress-ring" viewBox="0 0 36 36">
                            <circle className="bg" cx="18" cy="18" r="16" />
                            {index === i && (
                                <circle
                                    className="progress"
                                    cx="18"
                                    cy="18"
                                    r="16"
                                    style={{ animationDuration: `${DURATION}ms` }}
                                />
                            )}
                        </svg>
                        <span className="label">{id}</span>
                    </button>
                ))}
            </div>
            <div className="boneBanner"></div>
        </section>
    );
}
