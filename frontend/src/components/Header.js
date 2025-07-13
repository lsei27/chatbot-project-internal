import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <img
            src="https://cdn.prod.website-files.com/683548bebd66499a4ba7c0e5/6839b05d9abc5c5378aa2f74_INCatering_logo.svg"
            alt="IN CATERING logo"
            className="logo-img"
          />
        </div>
        <div className="header-subtitle">
          Váš pomocník při onboardingu a interních procesech
        </div>
      </div>
    </header>
  );
};

export default Header; 