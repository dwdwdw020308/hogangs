import React, { useLayoutEffect, useRef, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Content2 = () => {
  const rootRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 500, easing: "ease-out", once: false, offset: 0 });
    AOS.refresh();
  }, []);

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    // 1) .textline만 선택(다른 요소 영향 X)
    const lines = Array.from(root.querySelectorAll(".texttitle .textline"));

    // 유틸: 배열 셔플 (랜덤 스태거용)
    const shuffle = (arr) => {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    };

    // 2) 각 .textline을 “단어 span”으로 쪼개고, --i(지연 인덱스) 부여
    lines.forEach((line) => {
      if (line.dataset.split === "done") return;

      const text = line.textContent.trim();
      line.setAttribute("aria-label", text); // 접근성용 원문 보관
      line.textContent = ""; // 비우고 다시 채움

      const words = text.split(/\s+/).filter(Boolean);
      const baseIndexArr = words.map((_, i) => i);
      const randomOrder = shuffle(baseIndexArr); // 랜덤 순서

      words.forEach((word, idx) => {
        const span = document.createElement("span");
        span.className = "word";
        // 랜덤 순서에 맞는 인덱스를 --i로 저장 (애니메이션 지연에 사용)
        span.style.setProperty("--i", String(randomOrder[idx]));
        span.textContent = word + (idx < words.length - 1 ? " " : "");
        line.appendChild(span);
      });

      line.dataset.split = "done";
    });

    // 3) 스크롤 진입 시에만 애니메이션 켜기 (is-in 클래스 토글)
    const triggers = lines.map((el) =>
      ScrollTrigger.create({
        trigger: el,
        start: "top 85%",
        end: "bottom 20%",
        onEnter: () => el.classList.add("is-in"),
        onLeaveBack: () => el.classList.remove("is-in"),
        // markers: true,
      })
    );

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="content2" ref={rootRef}>
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
        <span
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="1000"
        >
          <img src="/about/03.png" alt="" />
        </span>
      </div>
    </section>
  );
};

export default Content2;
