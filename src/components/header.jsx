import React from 'react';
import { Link } from 'react-scroll'
import './header.css'

const Header = () => {
  return (
    <header className='header'>
      {/* Left Side: Name */}
      <div className='title'><a href='/'>Dmitrii Antropov</a></div>
      <nav className='menu'>
        <ul>
          <li>
            <Link className='menu-link' to='about' smooth={true} duration={333}>About</Link>
          </li>
          <li><Link className='menu-link' to='work' smooth={true} duration={333}>Work</Link></li>
          <li><Link className='menu-link' to='contact' smooth={true} duration={333}>Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;