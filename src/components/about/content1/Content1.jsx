import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Content1 = () => {
    const visualRef = useRef(null);

    useEffect(() => {
        const el = visualRef.current;

        gsap.fromTo(
            el,
            { scale: 1, y: 0 },
            {
                scale: 0.3,
                transformOrigin: 'center bottom',
                ease: 'ease in',
                y: 550,
                scrollTrigger: {
                    trigger: el,
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                    // markers: true,
                },
            }
        );
    }, []);

    return (
        <section id="content1">
            <div className="visual">
                <img ref={visualRef} src="/about/intro.jpg" alt="" />
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
