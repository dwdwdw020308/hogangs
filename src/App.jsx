import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Auth, AuthCallback, Main, Ott } from './pages';
import Layout from './common/Layout';
import './styles/index.scss';
import AboutUs from './pages/About';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                        <Route path="/ott" element={<Ott />} />
                        <Route path="about" element={<AboutUs />} />
                    </Route>
                    <Route path="auth" element={<Auth />} />
                    <Route path="authcallback" element={<AuthCallback />} />
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
