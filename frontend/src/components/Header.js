import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          <span className="logo-icon" style={{display: 'flex', alignItems: 'center'}}>
            {/* Inline SVG logo IN CATERING */}
            <svg width="40" height="40" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g>
                <circle cx="40" cy="40" r="40" fill="#fff"/>
                <path d="M60.2 54.6c-1.2-2.2-3.2-3.7-5.6-4.1-2.2-0.4-4.5-0.6-6.7-0.6h-15c-2.3 0-4.5 0.2-6.7 0.6-2.4 0.4-4.4 1.9-5.6 4.1-1.2 2.2-1.2 4.8 0 7 1.2 2.2 3.2 3.7 5.6 4.1 2.2 0.4 4.5 0.6 6.7 0.6h15c2.3 0 4.5-0.2 6.7-0.6 2.4-0.4 4.4-1.9 5.6-4.1 1.2-2.2 1.2-4.8 0-7zM40 48c5.5 0 10-4.5 10-10s-4.5-10-10-10-10 4.5-10 10 4.5 10 10 10zm0-28c-7.7 0-14 6.3-14 14 0 2.2 0.5 4.3 1.4 6.2 1.2 2.2 3.2 3.7 5.6 4.1 2.2 0.4 4.5 0.6 6.7 0.6s4.5-0.2 6.7-0.6c2.4-0.4 4.4-1.9 5.6-4.1 0.9-1.9 1.4-4 1.4-6.2 0-7.7-6.3-14-14-14z" fill="#e53935"/>
              </g>
            </svg>
          </span>
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