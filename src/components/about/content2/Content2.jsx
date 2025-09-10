import React, { useLayoutEffect, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
  const sectionRef = useRef(null);

  // ✅ GSAP/ScrollTrigger는 useLayoutEffect + context로 안전하게
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const q = gsap.utils.selector(section); // 섹션 내부에서만 선택
    const list = q(".texttitle")[0];
    const lines = q(".texttitle li");

    // 레이아웃 세팅 (필요하면 최소화)
    gsap.set(section, {
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      padding: "0 10vw",
      overflow: "hidden",
      boxSizing: "border-box",
      backgroundColor: "#fff",
    });

    if (list) {
      gsap.set(list, {
        margin: 0,
        padding: 0,
        listStyle: "none",
        display: "flex",
        flexDirection: "column",
        rowGap: "0vh",
      });
    }

    lines.forEach((el) => {
      gsap.set(el, {
        fontWeight: 700,
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0",
        willChange: "background-position",
      });
    });

    const liDistance = 500;
    const totalDistance = Math.max(lines.length * liDistance, 800);

    // ✅ context로 트윈/트리거 묶기
    const ctx = gsap.context(() => {
      gsap.fromTo(
        lines,
        { backgroundPosition: "100% 0" },
        {
          backgroundPosition: "0% 0",
          ease: "none",
          stagger: 1,
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: `+=${totalDistance}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            // 필요하면 pinSpacing 조정 가능
            // pinSpacing: true,
          },
        }
      );
    }, section);

    // ✅ 언마운트 시 pin/spacer 되돌리기 → removeChild 에러 방지
    return () => {
      ctx.revert(); // 이 한 줄이 pin/spacer, 인라인 스타일, 트윈/트리거 모두 정리
    };
  }, []);

  // AOS는 별도(필요 시)
  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-out", once: false, offset: 0 });
    AOS.refresh();
  }, []);

  return (
    <section id="content2" ref={sectionRef}>
      <div className="slogan">
        <img
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="500"
          src="/about/TitleBox.png"
          alt=""
        />
      </div>

      <ul className="texttitle">
        <li className="textline">
          호강스는 ‘반려견도 가족이다’라는 마음으로 시작되었습니다.
        </li>
        <li className="textline">
          우리 아이가 집처럼 편안하게 머물고, 보호자가 안심할 수 있는 공간을
          만들고자 합니다.
        </li>
        <li className="textline">
          맞춤형 호텔 서비스와 전문적인 미용을 통해 단순한 돌봄이 아닌 특별한
          경험을 제공합니다.
        </li>
        <li className="textline">
          작은 발자국 하나에도 행복이 묻어나는 순간, 호강스는 반려견과 보호자가
          함께하는 모든 시간을 더욱 특별하게 만듭니다.
        </li>
      </ul>

      <div className="dogicon">
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
          <img src="/about/01.png" alt="" />
        </span>
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
          <img src="/about/02.png" alt="" />
        </span>
        <span data-aos="fade-up" data-aos-duration="1000" data-aos-delay="1000">
          <img src="/about/03.png" alt="" />
        </span>
      </div>
    </section>
  );
};

export default Content2;
