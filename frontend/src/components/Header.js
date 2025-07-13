import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon">👥</span>
          <span className="logo-text">INTERNÍ ASISTENT</span>
        </div>
        <div className="header-subtitle">
          Váš pomocník při onboardingu a interních procesech
        </div>
      </div>
    </header>
  );
};

export default Header; 