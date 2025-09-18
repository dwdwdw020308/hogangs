import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

const HeadLine = () => {
  const tpRef = useRef(null);
  const textRef = useRef(null);
  const svgRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 시작 상태
      gsap.set(tpRef.current, { attr: { startOffset: "-60%" } });
      gsap.set(textRef.current, { opacity: 0, letterSpacing: 2 });

      // 로드 시 한 번 쭉 흘러나오기
      gsap.to(tpRef.current, {
        attr: { startOffset: "5%" },
        duration: 2.6,
        ease: "power1.out",
      });
      gsap.to(textRef.current, {
        opacity: 1,
        letterSpacing: 0.5,
        duration: 1.2,
        ease: "power1.out",
        delay: 0.2,
      });
    }, svgRef);
    return () => ctx.revert();
  }, []);

  return (
    <svg
      className="main_headline"
      xmlns="http://www.w3.org/2000/svg"
      width="909"
      height="266"
      viewBox="0 0 909 266"
      ref={svgRef}
      style={{ overflow: "visible" }} // 경로 바깥 글자 잘리지 않게
    >
      {/* ✅ textPath가 따라갈 경로: id 필수, 채움 없음 */}
      <path
        id="curve"
        d="M1.27655 88.3507C27.6582 69.5746 90.9778 30.285 133.203 23.3358C185.984 14.6493 302.393 5.27279 320.615 2.14725C338.836 -0.978292 436.646 3.01146 484.222 47.3055C531.798 91.5995 554.666 163.847 605.076 181.659C655.487 199.471 731.552 226.586 801.811 222.343C872.07 218.099 900.34 244.59 907.943 265"
        stroke="#FEFEFE"
        fill="none"
      />

      {/* ✅ 텍스트 색 명시 */}
      <text
        ref={textRef}
        fontSize="68"
        fontWeight="700"
        fontFamily="Paperlogy"
        fill="#ffffff"
      >
        {/* ✅ href + xlinkHref 모두 지정 (호환성) */}
        <textPath ref={tpRef} href="#curve" xlinkHref="#curve" startOffset="0%">
          <tspan>우리 댕댕이의 특별한 휴가 시작!</tspan>
        </textPath>
      </text>
    </svg>
  );
};

export default HeadLine;
