// Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Agentforce</div>
      <ul className="navbar-links">
        <li><Link to="/healthcare">Healthcare</Link></li>
          <li><Link to="/bfsi">BFSI</Link></li>
          <li><Link to="/logistics">Logistics</Link></li>
          <li><Link to="/digital-commerce">Digital Commerce</Link></li>
          <li><Link to="/hi-tech">Hi-Tech</Link></li>


        {/* Future: Add BFSI, Manufacturing etc here */}
      </ul>
    </nav>
  );
};

export default Navbar;
