import React, { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

function Navbar() {
  const [data, setData] = useState([]);
  const getDataFromLocalStorage = () => {
    const localStorageData = localStorage.getItem('token');
    return localStorageData ? localStorageData : null;
  };

  useEffect(() => {
    const localStorageData = getDataFromLocalStorage();
    setData(localStorageData);
  }, []);
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Navbar
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/" exact>
                Home
              </NavLink>
            </li>
            {data ? 
            <>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/createpost">
                CreatePost
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/profile">
                Profile
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/logout">
                Logout
              </NavLink>
            </li>
            </> :
            <>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/signup">
                Signup
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" to="/login">
                Login
              </NavLink>
            </li>
            </>
            }
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
