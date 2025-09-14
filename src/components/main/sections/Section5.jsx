import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Section5 = () => {
  const sectionRef = useRef(null);
  const pinSectionRef = useRef(null);
  const cardsWrapRef = useRef(null);
  const instaDog1Ref = useRef(null);
  const instaDog2Ref = useRef(null);
  const gridWrapRef = useRef(null);

  // 텍스트 refs
  const cardTextRef = useRef(null); // 카드 1장 텍스트
  const instaText1Ref = useRef(null); // 카드 2장 왼쪽 텍스트
  const instaText2Ref = useRef(null); // 카드 2장 오른쪽 텍스트

  const images = Array.from(
    { length: 18 },
    (_, i) => `/main/instaDog${i + 1}.png`
  );

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinSectionRef.current,
          start: "top top",
          end: "+=300%",
          scrub: true,
          pin: true,
        },
      });
      tl.fromTo(
        cardTextRef.current,
        { opacity: 0, y: 30 }, // 살짝 아래에서 시작
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power2.out",
          delay: 0.5, // ✅ 너무 빨리 나오지 않게 지연
        }
      );

      // 0️⃣ 카드 1장 텍스트 아래로 사라지기
      tl.to(cardTextRef.current, {
        y: 100,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      });

      // 1️⃣ 큰 이미지 → 카드 2개 (동시에 실행)
      tl.to(instaDog1Ref.current, {
        width: 890,
        height: 890,
        x: "-455px",
        ease: "power2.out",
        duration: 1.2, // 오른쪽 카드 duration과 맞춤
      });

      tl.fromTo(
        instaDog2Ref.current,
        { width: 890, height: 890, opacity: 0, x: "100vw" },
        {
          opacity: 1,
          x: "455px",
          ease: "power2.out",
          duration: 1.2,
        },
        "<" // ✅ 동시에 실행
      );

      // 2️⃣ 카드 2장 텍스트 동시에 등장
      tl.fromTo(
        [instaText1Ref.current, instaText2Ref.current],
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power2.out",
          delay: 0.3, // ✅ 너무 바로 나오지 않게
        }
      );

      // 3️⃣ grid 초기 상태
      gsap.set(gridWrapRef.current, {
        scale: 3.1,
        transformOrigin: "center center",
        opacity: 0,
      });

      // 4️⃣ 카드 그룹 제거 + grid 등장
      tl.to(cardsWrapRef.current, {
        opacity: 0,
        scale: 0.5,
        duration: 0.6,
        ease: "power1.inOut",
      });

      tl.fromTo(
        gridWrapRef.current,
        { scale: 3.1, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          ease: "power2.out",
          duration: 1.2,
        },
        "<"
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="main_section5" ref={sectionRef} className="section5">
      {/* 타이틀 */}
      <div className="title">
        <p>Instagram</p>
        <h2>
          오늘도 <span>예쁘개</span> 찰칵
        </h2>
      </div>

      {/* ✅ pin 구간 */}
      <div ref={pinSectionRef} className="pin-section">
        {/* 카드 그룹 */}
        <div ref={cardsWrapRef} className="cards-wrap">
          <img
            ref={instaDog1Ref}
            src="/main/instaDog9.png"
            alt="instaDog1"
            className="insta-dog1"
          />
          {/* 카드 1장 텍스트 */}
          <div className="card-text" ref={cardTextRef}>
            @hogangs
          </div>

          <img
            ref={instaDog2Ref}
            src="/main/instaDog10.png"
            alt="instaDog2"
            className="insta-dog2"
          />

          {/* 카드 2장 텍스트 (왼쪽 카드) */}
          <div className="insta-text insta-text1" ref={instaText1Ref}>
            <img src="/main/Logo.png" alt="logo" className="logo" />
            즐겁게 놀고 <br /> 예쁘게 돌아오는 곳
          </div>

          <div className="insta-text insta-text2" ref={instaText2Ref}>
            @hogangs
          </div>
        </div>

        {/* Grid Wrap */}
        <div ref={gridWrapRef} className="grid-wrap">
          {images.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`instaDog${i + 1}`}
              className="grid-item"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Section5;
