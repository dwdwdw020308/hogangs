import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Main } from './pages';
import Layout from './common/Layout';
import './styles/index.scss';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Main />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
