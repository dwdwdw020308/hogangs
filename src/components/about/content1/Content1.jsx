import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content1 = () => {
    const wrapperRef = useRef(null);
    const imgRef = useRef(null);

    useEffect(() => {
        const wrapper = wrapperRef.current;
        const img = imgRef.current;

        const init = () => {
            gsap.set(img, {
                transformOrigin: 'center bottom',
                force3D: true,
                willChange: 'transform',
            });

            const tween = gsap.fromTo(
                img,
                { scale: 1.3, y: -270 },
                {
                    scale: 0.3,
                    y: 550,
                    ease: 'power2.inOut',
                    immediateRender: false,
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top bottom',
                        end: 'bottom center',
                        scrub: 1,
                        invalidateOnRefresh: true,
                        // markers: true,
                    },
                }
            );

            return () => {
                tween.scrollTrigger?.kill();
                tween.kill();
            };
        };

        if (img.complete) {
            const cleanup = init();
            ScrollTrigger.refresh();
            return cleanup;
        } else {
            const onLoad = () => {
                const cleanup = init();
                ScrollTrigger.refresh();
                img.removeEventListener('load', onLoad);
                return cleanup;
            };
            img.addEventListener('load', onLoad, { once: true });
            return () => img.removeEventListener('load', onLoad);
        }
    }, []);

    return (
        <section id="content1">
            <div className="visual" ref={wrapperRef}>
                <img ref={imgRef} src="/about/intro.jpg" alt="" />
                <div className="box1">
                    <ul>
                        <li>호강의 시작</li>
                        <li>호강스에서</li>
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default Content1;
