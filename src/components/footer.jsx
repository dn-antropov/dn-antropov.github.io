import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>
        <a href="https://instagram.com/pastichegram" target="_blank" rel="noopener noreferrer">
          <img src="svg/Instagram_Glyph_White.svg" alt="Instagram" className="footer-icon" />
        </a>
        <a href="https://linkedin.com/in/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="svg/LI-In-Bug-White.png" alt="LinkedIn" className="footer-icon linkedin-icon"/>
        </a>
        <a href="https://github.com/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="svg/github-mark-white.svg" alt="GitHub" className="footer-icon"/>
        </a>
      </p>
    </footer>
  );
};

export default Footer;