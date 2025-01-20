import React from 'react';

const Contact = () => {
    return (
    <>
      <h1>Contact</h1>
      <p>I live in Frankfurt, Germany.</p>
      <p>It is the easiest to reach me out by email:</p>
      <p>In case you want to check my socials, where I not always very active, please follow:</p>
      <p>
        <a href="https://www.instagram.com/pastichegram" target="_blank" rel="noopener noreferrer">
          <img src="svg/Instagram_Glyph_White.svg" alt="Instagram" style= {{width: '32px', height: '32px'}}/>
        </a>
        <a href="https://www.linkedin.com/in/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="svg/LI-In-Bug-White.png" alt="LinkedIn" style= {{width: '38px', height: '32px'}}/>
        </a>
      </p>
    </>
    );
  };

  export default Contact;