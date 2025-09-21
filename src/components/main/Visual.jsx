import React, { useEffect, useRef } from "react";
import HeadLine from "./partials/HeadLine";

const Visual = () => {
  const introRef = useRef(null);
  const overlayRef = useRef(null);
  const captionRef = useRef(null);

  useEffect(() => {
    const mm = window.matchMedia("(max-width: 640px)");

    const inViewport = (el) => {
      if (!el) return 0;
      const H = window.innerHeight;
      const r = el.getBoundingClientRect();
      const t = r.top;
      const b = r.bottom;
      return Math.max(0, t > 0 ? H - t : b < H ? b : H);
    };

    const applyDesktopLayout = () => {
      const window_offset = inViewport(introRef.current);
      if (overlayRef.current) {
        overlayRef.current.style.height = `${window_offset}px`;
      }
      if (captionRef.current) {
        captionRef.current.style.position = "absolute";
        captionRef.current.style.bottom = `${window_offset / 4}px`;
      }
    };

    const applyMobileLayout = () => {
      if (overlayRef.current) {
        overlayRef.current.style.height = "";
      }
      if (captionRef.current) {
        captionRef.current.style.position = "";
        captionRef.current.style.bottom = "";
      }
    };

    const handleScrollResize = () => {
      if (mm.matches) {
        applyMobileLayout();
      } else {
        applyDesktopLayout();
      }
    };

    handleScrollResize();
    window.addEventListener("scroll", handleScrollResize);
    window.addEventListener("resize", handleScrollResize);
    mm.addEventListener?.("change", handleScrollResize);

    return () => {
      window.removeEventListener("scroll", handleScrollResize);
      window.removeEventListener("resize", handleScrollResize);
      mm.removeEventListener?.("change", handleScrollResize);
    };
  }, []);

  return (
    <section id="main-visual">
      <HeadLine />
      <figure className="intro" ref={introRef}>
        {/* 데스크탑에서만 보이는 이미지 */}
        <img src="/main/dog3.png" alt="강아지 PC용" />
        {/* 텍스트 */}
        <figcaption className="caption" ref={captionRef}>
          <h1>
            우리 댕댕이의 <br />
            <span className="special">
              <span className="dots">
                <span></span>
                <span></span>
                <span></span>
              </span>
              특별한
            </span>{" "}
            <strong>휴가</strong> 시작
          </h1>
        </figcaption>
        {/* 데스크탑에서만 보이는 곡선 overlay */}
        <span className="overlay" ref={overlayRef}>
          <svg
            version="1.1"
            id="circle"
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 -300 500 550"
            preserveAspectRatio="none"
          >
            <path
              fill="#eef9f7"
              d="M250,246.5c-97.85,0-186.344-40.044-250-104.633V250h500V141.867C436.344,206.456,347.85,246.5,250,246.5z"
            />
          </svg>
        </span>
      </figure>
    </section>
  );
};

export default Visual;
