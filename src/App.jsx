import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import Layout from './common/Layout';

const App = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}></Route>
                </Routes>
            </BrowserRouter>
        </>
    );
};

export default App;
