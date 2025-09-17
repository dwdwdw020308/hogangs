import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { Auth, AuthCallback, Grooming, Hotel, Main, MyPage, NotFiles, Ott, Reservation } from './pages';
import Layout from './common/Layout';
import './styles/index.scss';
import AboutUs from './pages/About';

import ScrollTop from './components/util/ScrollTop';
import Detail from './pages/ott/Detail';
import { useEffect } from 'react';
import useCommonStore from './store/useCommonStore';
import AdminLogin from './pages/admin/AdminLogin';
import RequireAdmin from './pages/admin/RequireAdmin';
import AdminLayout from './common/AdminLayout';
import AdminUsers from './pages/admin/AdminUsers';
import AdminVideos from './pages/admin/AdminVideos';

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
                    <Route path="reservation" element={<Reservation />} />
                </Route>
                <Route path="*" element={<NotFiles />} />
                <Route path="oauth" element={<Auth />} />
                <Route path="authCallback" element={<AuthCallback />} />

                <Route path="admin/login" element={<AdminLogin />} />

                <Route path="admin" element={<RequireAdmin />}>
                    <Route element={<AdminLayout />}>
                        <Route index element={<AdminUsers />} />
                        <Route path="users" element={<AdminUsers />} />
                        <Route path="video" element={<AdminVideos />} />
                        {/*<Route path="reservation" element={<AdminReservation />} /> */}
                    </Route>
                </Route>

            </Routes>
        </>
    );
};

export default App;
