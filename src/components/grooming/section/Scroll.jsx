import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Scroll = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const stageRef = useRef(null);
  const barRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const bar = barRef.current;
      const fill = fillRef.current;
      const dot = dotRef.current;
      const stage = stageRef.current;

      // 초기 상태
      gsap.set(stage, { scale: 0.25, transformOrigin: "center bottom" });
      gsap.set(fill, { width: 0 });
      gsap.set(dot, { x: 0 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current, // .story
          start: "top top",
          end: "+=240%", // 스크롤 길이(조절)
          scrub: 0.6,
          pin: viewportRef.current, // .story-viewport를 고정
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // scroller: innerRef.current, // 만약 .inner에 overflow: auto면 지정
          // markers: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(fill, { width: "100%" }, 0)
        .to(dot, { x: () => bar.clientWidth }, 0)
        .to(stage, { scale: 1.9 }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="grooming_scroll_section">
      <div className="inner">
        <div ref={sectionRef} className="story">
          <div ref={viewportRef} className="story-viewport">
            <div className="story-media">
              <div ref={stageRef} className="stage">
                <img
                  className="frame"
                  src="/grooming/scroll/step1.jpg"
                  alt=""
                />
                <img
                  className="frame"
                  src="/grooming/scroll/step2.jpg"
                  alt=""
                />
                <img
                  className="frame"
                  src="/grooming/scroll/step3.jpg"
                  alt=""
                />
                <img
                  className="frame"
                  src="/grooming/scroll/step4.jpg"
                  alt=""
                />
              </div>
            </div>

            <div className="story-pagination">
              <div ref={barRef} className="bar">
                <span ref={fillRef} className="fill" />
              </div>
              <div ref={dotRef} className="dot" aria-hidden>
                <i></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scroll;
