import gsap from "gsap";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);
const Scroll = () => {
  const sectionRef = useRef(null);
  const viewportRef = useRef(null);
  const imgRef = useRef(null);
  const barRef = useRef(null);
  const fillRef = useRef(null);
  const dotRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const img = imgRef.current;
      const bar = barRef.current;
      const fill = fillRef.current;
      const dot = dotRef.current;

      // 초기 상태
      gsap.set(img, { scale: 0.9 });
      gsap.set(fill, { width: 0 });
      gsap.set(dot, { x: 0 });

      // 스크롤 진행 = 바 채움 + 도트 이동 + 이미지 확대
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=200%", // 스크롤 길이 (필요하면 조절)
          scrub: 0.5, // 스크럽 동기화
          pin: viewportRef.current, // 이미지/바를 고정
          anticipatePin: 1,
          invalidateOnRefresh: true, // 리사이즈 시 재계산
          // markers: true,
        },
        defaults: { ease: "none" },
      });

      tl.to(fill, { width: "100%" }, 0)
        .to(dot, { x: () => bar.clientWidth }, 0)
        .to(img, { scale: 1.25 }, 0); // 최종 스케일 원하는 값으로
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="grooming_scroll_section">
      <div className="inner">
        <div ref={sectionRef} className="story">
          <div ref={viewportRef} className="story-viewport">
            <div className="story-media">
              <img
                ref={imgRef}
                src="/assets/example.jpg" // ▶︎ 이미지 경로
                alt=""
                className="story-img"
              />
            </div>

            <div className="story-pagination">
              <div ref={barRef} className="bar">
                <span ref={fillRef} className="fill" />
              </div>
              <div ref={dotRef} className="dot" aria-hidden>
                🥰
              </div>

              {/* 마일스톤 텍스트가 필요하면 여기에 넣기 */}
              {/* <ul className="milestones"> ... </ul> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Scroll;
