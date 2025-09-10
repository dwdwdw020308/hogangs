import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollTop = () => {
  const { pathname, search, hash } = useLocation();
  useEffect(() => {
    // 해시(anchor)가 있으면 그 요소로, 없으면 최상단
    if (hash) {
      const el = document.querySelector(hash);
      if (el) {
        el.scrollIntoView({ block: "start" });
        return;
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, search, hash]);
  return null;
};

export default ScrollTop;
