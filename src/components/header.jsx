import React, {useState} from 'react';
import { Link } from 'react-scroll'
import './header.css'

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);
  return (
    <header className='header'>
      <div className='header-top'>
        <div className='title'><a href='/cv/CV.pdf'>Dmitrii Antropov</a></div>
        <div className='hamburger' onClick={toggleMenu}>
          ☰
        </div>
      </div>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li>
            <Link
              className='menu-link'
              to='about'
              smooth={true}
              duration={333}
              onClick={() => setMenuOpen(false)}
            >
              About
            </Link>
          </li>
          <li>
            <Link
              className='menu-link'
              to='work'
              smooth={true}
              duration={333}
              onClick={() => setMenuOpen(false)}
            >
              Work
            </Link>
          </li>
          <li>
            <Link
              className='menu-link'
              to='contact'
              smooth={true}
              duration={333}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;