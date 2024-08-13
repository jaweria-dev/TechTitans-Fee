import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useAuth } from '../context/Context';
import toast from 'react-hot-toast';

const Header = () => {
  const [auth, setAuth] = useAuth();
  const handleLogout = () => {
    setAuth({
      ...auth, user: null, token: ""
    });
    localStorage.removeItem('auth');
    toast.success("Logout Successfully!", { duration: 5000 });
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container-fluid">
          <Link to="/dashboard/admin" className="navbar-brand">
            <img src="../../src/assets/saylani-logo.png" alt="" max-height="50px" width="80px"/>
          </Link>
          <div className="navbar-nav ms-auto">
            {!auth?.user ? (
              <>
                <NavLink to="/register" className="nav-link">
                  Register
                </NavLink>
                <NavLink to="/" className="nav-link">
                  Login
                </NavLink>
              </>
            ) : (
              <div className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {auth?.user?.name}
                </NavLink>
                <ul className="dropdown-menu dropdown-menu-end" style={{ position: 'absolute', top: '100%' }}>
                  <li>
                    <NavLink to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user"}`} className="dropdown-item">
                      Dashboard
                    </NavLink>
                  </li>
                  <li>
                    <NavLink onClick={handleLogout} to="/" className="dropdown-item">
                      Logout
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
