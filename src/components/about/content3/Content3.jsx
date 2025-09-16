import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const DURATION = 5000;
const slides = [
    {
        id: '01',
        title: '따뜻한 두 번째 집',
        desc: '보호자가 믿고 맡길 수 있는 신뢰감 있는 호텔 & 미용 서비스',
        img: '/about/doghead.png',
    },
    {
        id: '02',
        title: '귀엽고 즐거운 경험',
        desc: '강아지의 행복한 표정과 즐거움을 최우선으로',
        img: '/about/doghead.png',
    },
    {
        id: '03',
        title: '사랑을 담은 세심한 케어',
        desc: '단순 관리가 아닌 반려견을 가족처럼 아끼는 브랜드 철학',
        img: '/about/doghead.png',
    },
];

export default function Content3() {
    const sectionRef = useRef(null);
    const imgRef = useRef(null);

    const [index, setIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = imgRef.current;
        gsap.set(el, { transformOrigin: 'center center' });

        gsap.fromTo(
            el,
            { rotate: 0, scale: 1 },
            {
                keyframes: [
                    { rotate: 180, scale: 0 },
                    { rotate: 360, scale: 1 },
                ],
                ease: 'none',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    end: '+=500',
                    scrub: true,
                    // markers: true,
                },
            }
        );
    }, []);

    useEffect(() => {
        const st = ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom top',
            onEnter: () => setIsVisible(true),
            onEnterBack: () => setIsVisible(true),
            onLeave: () => setIsVisible(false),
            onLeaveBack: () => setIsVisible(false),
        });
        return () => st.kill();
    }, []);

    useEffect(() => {
        if (!isVisible) return;
        const t = setTimeout(() => {
            setIndex((prev) => (prev + 1) % slides.length);
        }, DURATION);
        return () => clearTimeout(t);
    }, [index, isVisible]);

    const { id, title, desc, img } = slides[index];
    return (
        <section id="content3" ref={sectionRef}>
            <h2>Brand Identity</h2>
            <div className="content-box fade" key={id}>
                <div className="visual">
                    <img src={img} alt="" ref={imgRef} />
                </div>
                <div className="texts">
                    <strong className="title" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500" >{title}</strong>
                    <p className="desc" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="500">{desc}</p>
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
        </section>
    );
}
