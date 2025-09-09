import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Main } from './pages';
import Layout from './common/Layout';
import './styles/index.scss';
import AboutUs from './pages/About';
import MyPage from './pages/mypage';
import Videos from './pages/videos';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path="about" element={<AboutUs />} />
                        <Route path="mypage" element={<MyPage />} />
                        <Route path="videos" element={<Videos />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
