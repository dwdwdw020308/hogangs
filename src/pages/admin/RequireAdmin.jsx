import { Outlet, useLocation } from "react-router-dom";

const ADMIN_STORAGE_KEY = 'adminAuth';


const RequireAdmin = () => {
    const loc = useLocation();
    const authed = !!localStorage.getItem(ADMIN_STORAGE_KEY);

    if (!authed) {
        return <Navigate to="/admin/login" replace state={{ from: loc }} />;
    }
    return <Outlet />;
};

export default RequireAdmin;