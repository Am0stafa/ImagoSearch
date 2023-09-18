import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="navbar">
      <div className="container">
        <div className="brand">Reverse Image Search</div>
        <div className="nav-items">
          <Link to="/upload" className="nav-item">
            Upload & Build Database
          </Link>
          <Link to="/" className="nav-item">
            Search Similar images
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
