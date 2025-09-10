import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import {
  Auth,
  AuthCallback,
  Hotel,
  Main,
  MyPage,
  NotFiles,
  Ott,
} from "./pages";
import Layout from "./common/Layout";
import "./styles/index.scss";
import AboutUs from "./pages/About";
import Videos from "./pages/videos";
import ScrollTop from "./components/util/ScrollTop";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <ScrollTop />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/ott" element={<Ott />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="videos" element={<Videos />} />
            <Route path="hotel" element={<Hotel />} />
          </Route>
          <Route path="*" element={<NotFiles />} />
          <Route path="auth" element={<Auth />} />
          <Route path="authcallback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
