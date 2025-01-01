import React from 'react';
import './header.css'

const Header = () => {
  return (
    <header className='header'>
      {/* Left Side: Name */}
      <div className='header-title'>Dmitrii Antropov</div>

      {/* Right Side: Burger Menu */}
      <div className="burger-menu">
        <div className="burger-bar" />
        <div className="burger-bar" />
        <div className="burger-bar" />
      </div>
    </header>
  );
};

export default Header;