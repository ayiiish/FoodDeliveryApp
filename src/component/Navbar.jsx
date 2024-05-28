import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('authtoken');
    navigate('/login');
  };

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <Link className="navbar-brand fs-3 fst-italic" to="/">
            FoodExpress
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <Link className="nav-link active fs-6 mx-3" aria-current="page" to="/">
                  Home
                </Link>
              </li>
              {localStorage.getItem('authtoken') ? (
                <li className="nav-item">
                  <Link className="nav-link active fs-6 mx-1" aria-current="page" to="/">
                    My Orders
                  </Link>
                </li>
              ) : (
                ''
              )}
            </ul>

            <div className="d-flex">
              {!localStorage.getItem('authtoken') ? (
                <div className="d-flex">
                  <Link className="btn bg-secondary text-light" to="/login">
                    Login
                  </Link>
                  <Link className="btn bg-secondary text-light" to="/signup">
                    Signup
                  </Link>
                </div>
              ) : (
                <div className="d-flex">
                  <div className="btn bg-secondary text-light fs-6 mt-2">
                    My Cart
                  </div>
                  <div
                    className="btn bg-secondary text-danger mx-2 fs-4 mb-1"
                    onClick={handleLogout}
                  >
                    Logout
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
