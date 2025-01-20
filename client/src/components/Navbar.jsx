import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {
  return (
    <header>
      <nav>
        <h2 className='nav-logo'>
          <Link to="/">HealSpace</Link>
        </h2>
        <ul className='nav-links'>
          <li><Link to="/home">Home</Link></li>
          <li><Link to="/doctors">Doctors</Link></li>
          <li><Link to="/login">Login</Link></li>
          <li><Link to="/register">Register</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Navbar;
