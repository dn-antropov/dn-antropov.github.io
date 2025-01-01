import React from 'react';

const Header = () => {
  return (
    <header
      className='header'
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 20px',
        background: 'rgba(0, 0, 0, 0.5)', // Transparent background
        color: 'white',
        zIndex: 10,
      }}
    >
      {/* Left Side: Name */}
      <div style={{ fontSize: '18px', fontWeight: 'bold' }}>Dmitrii Antropov</div>

      {/* Right Side: Burger Menu */}
      <div style={{ cursor: 'pointer' }}>
        <div
          style={{
            width: '25px',
            height: '3px',
            background: 'white',
            margin: '4px 0',
          }}
        ></div>
        <div
          style={{
            width: '25px',
            height: '3px',
            background: 'white',
            margin: '4px 0',
          }}
        ></div>
        <div
          style={{
            width: '25px',
            height: '3px',
            background: 'white',
            margin: '4px 0',
          }}
        ></div>
      </div>
    </header>
  );
};

export default Header;