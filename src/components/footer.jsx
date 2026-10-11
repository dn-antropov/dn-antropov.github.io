import React from 'react';
import './footer.css'

const Footer = () => {
  return (
    <footer className='footer'>
      <p>
        <a href="https://codeberg.org/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="/svg/codeberg.svg" alt="Codeberg" className="footer-icon" />
        </a>
        <a href="https://dnantropov.itch.io" target="_blank" rel="noopener noreferrer">
          <img src="/svg/itchdotio.svg" alt="itch.io" className="footer-icon" />
        </a>
        <a href="https://github.com/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="/svg/github-mark-white.svg" alt="GitHub" className="footer-icon" />
        </a>
        <a href="https://bsky.app/profile/dnantropov.bsky.social" target="_blank" rel="noopener noreferrer">
          <img src="/svg/bluesky.svg" alt="Bluesky" className="footer-icon" />
        </a>
      </p>
    </footer>
  );
};

export default Footer;
