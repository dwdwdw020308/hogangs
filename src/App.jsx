import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Auth, AuthCallback, Grooming, Hotel, Main, MyPage, NotFiles, Ott } from './pages';
import Layout from './common/Layout';
import './styles/index.scss';
import AboutUs from './pages/About';

import ScrollTop from './components/util/ScrollTop';
import Detail from './pages/ott/Detail';
import { useEffect } from 'react';
import useCommonStore from './store/useCommonStore';

const App = () => {
    const { setActiveMenu, setIsMain } = useCommonStore();
    const location = useLocation();
    const activeMenu = useCommonStore((s) => s.activeMenu);
    useEffect(() => {
        const pathname = location.pathname;
        setActiveMenu(pathname);
        setIsMain(pathname);
    }, [location.pathname, setActiveMenu]);
    return (
        <>
            <ScrollTop />
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<Main />} />
                    <Route path="/video" element={<Ott />} />
                    <Route path="video/:id" element={<Detail />} />
                    <Route path="about" element={<AboutUs />} />
                    <Route path="mypage" element={<MyPage />} />
                    <Route path="hotel" element={<Hotel />} />
                    <Route path="grooming" element={<Grooming />} />
                </Route>
                <Route path="*" element={<NotFiles />} />
                <Route path="oauth" element={<Auth />} />
                <Route path="authcallback" element={<AuthCallback />} />
            </Routes>
        </>
    );
};

export default App;
