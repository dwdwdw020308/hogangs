import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useLayoutEffect, useRef } from "react";
import HotelIntroduceSwiper from "../swiper/HotelIntroduceSwiper";
import { startOfWeek } from "../../../utils/Date";

gsap.registerPlugin(ScrollTrigger);
const IntroduceService = () => {
  const pathRef = useRef(null);
  const tp1Ref = useRef(null);
  const tp2Ref = useRef(null);
  const t1WrapRef = useRef(null);
  const t2WrapRef = useRef(null);
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const tp1 = tp1Ref.current;
      const tp2 = tp2Ref.current;
      if (!path || !tp1 || !tp2) return;

      // 연결 보증
      tp1.setAttribute("href", "#curve");
      tp2.setAttribute("href", "#curve");
      tp1.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#curve"
      );
      tp2.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        "#curve"
      );

      // 초기값: 왼쪽 밖에서 대기
      gsap.set([tp1, tp2], { attr: { startOffset: -100 } });

      // ▶ 스크롤로 보일 때 1회 재생
      const tl = gsap.timeline({
        defaults: { ease: "power2.out", duration: 1.2 },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%", // 보이는 시점 조절
          end: "+=1",
        },
      });

      tl.to(tp1, { attr: { startOffset: 144 } }).to(
        tp2,
        { attr: { startOffset: 25 } },
        0.2
      );
    }, sectionRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="introduce_hotel_service">
      <div className="inner">
        <div className="title">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="523"
            height="86"
            viewBox="0 0 523 86"
            style={{ overflow: "visible" }}
          >
            <path
              id="curve"
              ref={pathRef}
              d="M1 85C77.8609 8.82492 336.658 -57.952 522 85"
              fill="none"
              stroke="none"
            />

            <text
              id="t1"
              ref={t1WrapRef}
              fontFamily="Paperlogy"
              fontSize="68"
              fontWeight="700"
            >
              <textPath
                id="Text1"
                ref={tp1Ref}
                startOffset="-50%"
                fill="#4A9F99"
              >
                할 준비, 됐개?
              </textPath>
            </text>

            <text
              id="t2"
              ref={t2WrapRef}
              fontFamily="Paperlogy"
              fontSize="68"
              fontWeight="700"
            >
              <textPath id="Text2" ref={tp2Ref} startOffset="-50%" fill="#333">
                호강
              </textPath>
            </text>
          </svg>
        </div>
        <span>집 떠나도 두려움 0% 행복은 100% 호강스에서 오늘도 호강하게!</span>
        <HotelIntroduceSwiper />
      </div>
    </section>
  );
};

export default IntroduceService;
