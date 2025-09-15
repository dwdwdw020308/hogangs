
import { useEffect, useRef, useState } from "react";
import BubbleLanding from "../../components/main/BubbleLanding";
import ChannelTalk from "../../components/main/ChannelTalk";
import Visual from "../../components/main/Visual";
import { getCookie, setCookie } from "../../utils/Cookie";
import Section1 from "../../components/main/sections/Section1";
import Section2 from "../../components/main/sections/Section2";
import gsap from "gsap";
import Section3 from "../../components/main/sections/Section3";
import Section4List from "../../components/main/sections/Section4List";
import Section5 from "../../components/main/sections/Section5";

const Main = () => {
  const [landingOn, setLandingOn] = useState(false); // 기본값 false → 쿠키 체크 후 결정
  const pawRef = useRef(null);

  useEffect(() => {
    // 쿠키 확인
    const hidden = getCookie("landing");

    if (!hidden) {
      // 쿠키가 없으면 랜딩 페이지 보여주기
      setLandingOn(true);
    }
  }, []);

  useEffect(() => {
    // body 스크롤 잠금 처리
    if (landingOn) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [landingOn]);

  useEffect(() => {
    // ChannelTalk 동작 제어
    if (typeof window.ChannelIO !== "function") return;

    if (landingOn) {
      window.ChannelIO("hideMessenger");
      window.ChannelIO("hideChannelButton");
    } else {
      window.ChannelIO("showChannelButton");
    }
  }, [landingOn]);

  // 랜딩 닫을 때 쿠키 저장 (하루 유지)
  const handleCloseLanding = () => {
    setCookie("landing", "1", 1); // 하루(1일) 동안 유지
    setLandingOn(false);
  };

  // ----------------- cursor
  useEffect(() => {
    const el = pawRef.current;
    if (!el) return;

    // 성능 좋게 x/y만 갱신
    const setX = gsap.quickSetter(el, "x", "px");
    const setY = gsap.quickSetter(el, "y", "px");

    // 커서 바로 뒤로 보이게 살짝 오프셋 (원하는 값으로 조절)
    const offsetX = 15; // 커서 우측으로 12px
    const offsetY = 15; // 커서 아래로 10px

    const onMove = (e) => {
      setX(e.clientX + offsetX);
      setY(e.clientY + offsetY);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);
  return (
    <>
      <div style={{ pointerEvents: landingOn ? "none" : "auto" }}>
        <Visual aria-hidden={landingOn} />

        <Section1 />
        <Section2 />
        <Section3 />
        <Section4List />
        <Section5 />
      </div>
      {landingOn && <BubbleLanding onClose={handleCloseLanding} />}
      <ChannelTalk />
      <img
        ref={pawRef}
        src="/Paw.svg"
        alt=""
        className="paw-fixed"
        aria-hidden
      />
    </>
  );
};

export default Main;
