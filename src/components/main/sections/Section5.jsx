import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
    const sectionRef = useRef(null);
    const galleryRef = useRef(null);

    const images = Array.from({ length: 18 }, (_, i) => `/main/instaDog${i + 1}.png`);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const gallery = galleryRef.current;
            const items = gallery.querySelectorAll('.item');

            // ✅ 초기 상태: grid 자체는 크게 확대
            gsap.set(gallery, { scale: 3.1, transformOrigin: 'center center' });

            // ✅ 초기 상태: 모든 아이템 숨기고 중앙 2개만 보이기
            items.forEach((el, i) => {
                if (i === 8 || i === 9) {
                    gsap.set(el, { opacity: 1 });
                } else {
                    gsap.set(el, { opacity: 0 });
                }
            });

            // ✅ 스크롤 시 grid 축소 + 모든 아이템 나타나기
            gsap.to(gallery, {
                scale: 1,
                ease: 'power2.inOut',
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top top',
                    end: '+=200%',
                    scrub: true,
                    pin: true,
                    onUpdate: (self) => {
                        // 스크롤 진행 비율에 따라 opacity도 점점 보이도록
                        gsap.to(items, {
                            opacity: 1,
                            duration: 0.5,
                            overwrite: 'auto',
                        });
                    },
                },
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section className="section5" ref={sectionRef}>
            <div className="gallery" ref={galleryRef}>
                {images.map((src, i) => (
                    <div className="item" key={i}>
                        <img src={src} alt={`instaDog${i + 1}`} />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Section5;
