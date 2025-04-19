import React from 'react';

const Contact = () => {
    return (
    <>
      <h1>Contact</h1>
      <p class="text">
        I've been based in Frankfurt, Germany since 2019.
      </p>
      <p class="text">
        Drop me a letter: <a href="mailto:dn.antropov@gmail.com">dn.antropov@gmail.com</a>
      </p>
      <p>I'm not very active on socials, but you can find some of my
        audiovisual works on <a href="https://www.instagram.com/pastichegram">Instagram</a> and
        more corporate-flavored stuff on <a href="https://www.linkedin.com/in/dn-antropov">LinkedIn</a>:</p>
      <p>
        <a href="https://www.instagram.com/pastichegram" target="_blank" rel="noopener noreferrer">
          <img src="svg/Instagram_Glyph_White.svg" alt="Instagram" style= {{width: '32px', height: '32px',  marginRight: '12px'}}/>
        </a>
        <a href="https://www.linkedin.com/in/dn-antropov" target="_blank" rel="noopener noreferrer">
          <img src="svg/LI-In-Bug-White.png" alt="LinkedIn" style= {{width: '38px', height: '32px'}}/>
        </a>
      </p>
    </>
    );
  };

  export default Contact;