import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Section3() {
  const rootRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const titleRef = useRef(null);
  const descRef = useRef(null);
  const videoRef = useRef(null);

  useLayoutEffect(() => {
    if (!rootRef.current) return;

    const ctx = gsap.context(() => {
      gsap.set([leftRef.current, rightRef.current], { xPercent: 0, opacity: 1 });
      gsap.set([titleRef.current, descRef.current], { opacity: 0, y: 20 });
      gsap.set(videoRef.current, { opacity: 0, y: 30 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=160%',
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });

      tl.to(leftRef.current,  { xPercent: -100, duration: 1 }, 0)
        .to(rightRef.current, { xPercent: 100, duration: 1 }, 0)
        .to([leftRef.current, rightRef.current], { opacity: 0, duration: 0.4 }, '>-0.2');

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .to(descRef.current,  { opacity: 1, y: 0, duration: 0.6 }, '<0.1')
        .to(videoRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.2');
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="section3" ref={rootRef}>
      <div className="s3-curtain s3-curtain--left" ref={leftRef}></div>
      <div className="s3-curtain s3-curtain--right" ref={rightRef}></div>

      <div className="inner">
        <div className="textcontent">
          <h2 ref={titleRef}>PawFlix</h2>
          <p ref={descRef}>소중한 반려견과 함께하는 달콤한 휴식</p>
        </div>
      </div>

      <div className="video">
        <div className="video-frame" ref={videoRef}>
          <iframe
            width="1800"
            height="817"
            src="https://www.youtube.com/embed/a0rBbgh05oc?autoplay=1&mute=1&controls=1"
            title="강아지 광고"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          />
        </div>
      </div>
    </section>
  );
}
