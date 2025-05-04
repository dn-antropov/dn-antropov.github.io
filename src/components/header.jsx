import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './header.css';

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNav = (section) => {
    setMenuOpen(false);
    navigate('/', { state: { scrollTo: section } });
  };

  return (
    <header className='header'>
      <div className='header-top'>
        <div className='title'>
          <a href='/cv/CV.pdf'>Dmitrii Antropov</a>
        </div>
        <div className='hamburger' onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </div>
      </div>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <button className='menu-link button-reset' onClick={() => handleNav('about')}>
              About
            </button>
          </li>
          <li>
            <button className='menu-link button-reset' onClick={() => handleNav('work')}>
              Work
            </button>
          </li>
          <li>
            <button className='menu-link button-reset' onClick={() => handleNav('contact')}>
              Contact
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
