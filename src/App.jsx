import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { Auth, AuthCallback, Main, MyPage, Ott } from "./pages";
import Layout from "./common/Layout";
import "./styles/index.scss";
import AboutUs from "./pages/About";

import Videos from "./pages/videos";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Main />} />
            <Route path="/ott" element={<Ott />} />
            <Route path="about" element={<AboutUs />} />
            <Route path="mypage" element={<MyPage />} />
            <Route path="videos" element={<Videos />} />
          </Route>
          <Route path="auth" element={<Auth />} />
          <Route path="authcallback" element={<AuthCallback />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
