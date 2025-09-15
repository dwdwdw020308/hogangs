import { useEffect, useRef, useState } from "react";
import Login from "../../components/auth/Login";
import { Link, useNavigate } from "react-router-dom";
import Join from "../../components/auth/join";
import useAuthStore from "../../store/useAuthStore";
import NotLoginH from "./NotLogin";
import LoginMenu from "./LoginMenu";
import useCommonStore from "../../store/useCommonStore";

const Header = () => {
  const loginModal = useAuthStore((state) => state.loginModal);
  const joinModal = useAuthStore((state) => state.joinModal);
  const isLogin = useAuthStore((state) => state.isLogin);
  const isMain = useCommonStore((state) => state.isMain);

  // header menu active추가
  const activeMenu = useCommonStore((state) => state.activeMenu);

  const [hidden, setHidden] = useState(false); // header 숨김 상태
  const timeoutRef = useRef(null);

  const navigate = useNavigate();

  const { setLoginModal, setJoinModal, setUser, setLogin } = useAuthStore();

  useEffect(() => {
    // 팝업이면(자식창) 여기 리스너는 필요 없음
    if (window.opener) return;

    const handleMessage = (data) => {
      const { type, payload } = data || {};
      switch (type) {
        case "LOGIN_SUCCESS":
          setUser(payload?.user);
          setLogin(true);
          setLoginModal(false);
          break;
        case "OPEN_JOIN":
          setLoginModal(false);
          setJoinModal(true);
          break;
        case "GOOGLE_AUTH_ERROR":
          // 필요하면 에러 토스트 등
          setLoginModal(false);
          break;
        default:
          break;
      }
    };

    // 1) BroadcastChannel 수신
    const bc = new BroadcastChannel("auth");
    const onBC = (e) => handleMessage(e.data);
    bc.addEventListener("message", onBC);

    // 2) postMessage 수신(백업 경로)
    const onWinMsg = (e) => {
      if (e.origin !== window.location.origin) return; // 동일 오리진만
      handleMessage(e.data);
    };
    window.addEventListener("message", onWinMsg);

    return () => {
      bc.removeEventListener("message", onBC);
      bc.close();
      window.removeEventListener("message", onWinMsg);
    };
  }, [setLogin, setUser, setLoginModal, setJoinModal]);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      // 스크롤 중이면 바로 header 숨기기
      setHidden(true);

      // 기존 타이머 초기화 (계속 스크롤 중이면 delay 유지)
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 스크롤 멈춘 후 0.5초 뒤 다시 보여줌
      timeoutRef.current = setTimeout(() => {
        setHidden(false);
      }, 500); // 0.5초 delay
    };

    if (!isMain) return;
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [isMain]);

  return (
    <header
      id="header"
      style={{
        transition: "opacity 0.3s ease", // 부드럽게 전환
        opacity: hidden ? 0 : 1,
      }}
    >
      <div className="inner">
        <h2
          onClick={() => {
            navigate("/");
          }}
          className="logo"
        ></h2>

        <nav>
          <ul>
            <li
              onClick={() => {
                navigate("/about");
              }}
              className={activeMenu === "/about" ? "active" : ""}
            >
              Brand Story
            </li>
            <li
              onClick={() => {
                navigate("/video");
              }}
              className={activeMenu === "/video" ? "active" : ""}
            >
              Video
            </li>
            <li
              onClick={() => {
                navigate("/hotel");
              }}
              className={activeMenu === "/hotel" ? "active" : ""}
            >
              Hotel
            </li>
            <li
              onClick={() => {
                navigate("/grooming");
              }}
              className={activeMenu === "/grooming" ? "active" : ""}
            >
              Grooming
            </li>
          </ul>
        </nav>
        {isLogin ? <LoginMenu /> : <NotLoginH />}
      </div>
      {loginModal && (
        <Login
          onJoin={() => {
            setLoginModal(false);
            setJoinModal(true);
          }}
        />
      )}
      {joinModal && <Join />}
    </header>
  );
};

export default Header;
