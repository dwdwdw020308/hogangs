// /pages/admin/AdminLayout.jsx
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import '../styles/admin/_layout.scss'
const ADMIN_STORAGE_KEY = 'adminAuth';

export default function AdminLayout() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="admin-shell">
      <aside className="admin-aside">
        <h2 className="brand">Admin</h2>

        <nav className="admin-nav">
          <NavLink to="/admin/users" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
            Users
          </NavLink>
          <NavLink to="/admin/video" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
            Video
          </NavLink>
          <NavLink to="/admin/reservation" className={({isActive}) => `nav-link${isActive ? ' active' : ''}`}>
            Reservation
          </NavLink>
        </nav>

        <button className="logout-btn" onClick={logout}>Logout</button>
      </aside>

      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
}
