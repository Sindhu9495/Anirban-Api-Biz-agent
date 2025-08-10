// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Agentforce Portal</div>
      <ul className="navbar-links">
        <li><Link to="/healthcare">Healthcare</Link></li>
        {/* Future: Add BFSI, Manufacturing etc here */}
      </ul>
    </nav>
  );
};

export default Navbar;
