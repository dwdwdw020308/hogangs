import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useLayoutEffect, useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);
const Photo = () => {
    const scopeRef = useRef(null);
    const img1Ref = useRef(null);
    const img2Ref = useRef(null);
    const img3Ref = useRef(null);
    const img4Ref = useRef(null);

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            gsap.set(img1Ref.current, { y: 200, opacity: 0 });
            gsap.set(img2Ref.current, { y: 200, opacity: 0 });
            gsap.set(img3Ref.current, { y: 200, opacity: 0 });
            gsap.set(img4Ref.current, { y: 200, opacity: 0 });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: scopeRef.current,
                    duration: 4,
                    start: 'top 80%',
                    end: 'bottom top',
                    // markers: true,
                },
            });

            tl.to(img1Ref.current, { y: 0, opacity: 1 })
                .to(img2Ref.current, { y: 0, opacity: 1 })
                .to(img3Ref.current, { y: 0, opacity: 1 })
                .to(img4Ref.current, { y: 0, opacity: 1 });
        }, scopeRef);

        return () => ctx.revert();
    }, []);
    return (
        <section id="hotel_photo_section" ref={scopeRef}>
            <div className="inner">
                <div className="right">
                    <h2 className="logo"></h2>
                    <span>
                        호강스 호텔은 반려견을 위한 가장 특별한 휴식처입니다. <br />
                        조용한 음악과 깨끗한 객실, 그리고 전문 케어팀의 세심한 돌봄으로 사랑하는
                        <br />
                        반려견의 하루를 완벽하게 책임집니다.
                    </span>
                </div>
                <img src="/hotel/photo/1.png" alt="" className="img1" ref={img1Ref} />
                <img src="/hotel/photo/2.png" alt="" className="img2" ref={img2Ref} />
                <img src="/hotel/photo/3.png" alt="" className="img3" ref={img3Ref} />
                <img src="/hotel/photo/4.png" alt="" className="img4" ref={img4Ref} />
            </div>

            {/* text marquee */}
            <div className="text_marquee_area">
                <div className="marquee_wrapper">
                    <div className="marquee__inner">
                        <span>PREMIUM LIFE YOUR DOG</span>
                        <span>PREMIUM LIFE YOUR DOG</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Photo;
