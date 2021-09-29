import logo from '../images/logo.svg';
import hamburgerOpen from '../images/hamburgerOpen.svg';
import hamburgerClose from '../images/hamburgerClose.svg';
import { Link } from 'react-router-dom';
import React from 'react';

export default function Header({ loggedIn, navText, handleLogout, path, userEmail }) {
  const [isHamburgerOpen, setIsHamburgerOpen] = React.useState(false);

  function toggleHamburger() {
    setIsHamburgerOpen(!isHamburgerOpen);
  }

  function handleLogoutFromDropdown() {
    toggleHamburger();
    handleLogout();
  }

  return (
    <>
      {/* fancy dropdown menu */}
      {loggedIn && (
        <div className={`header__dropdown ${isHamburgerOpen && 'header__dropdown_open'}`}>
          <p className="header__dropdown-email">{userEmail}</p>
          <Link to={path} onClick={handleLogoutFromDropdown} className="header__dropdown-link">
            {navText}
          </Link>
        </div>
      )}
      {/* rest of header */}
      <header className="header">
        <Link to="/">
          <img id="logo" src={logo} alt="Around the U.S." className="logo" />
        </Link>
        {loggedIn ? (
          <div>
            <nav className="header__nav-container">
              <p className="header__email">{userEmail}</p>
              <Link to={path} onClick={handleLogout} className="header__link">
                {navText}
              </Link>
            </nav>
            <button className="header__hamburger" onClick={toggleHamburger}>
              <img
                src={!isHamburgerOpen ? hamburgerOpen : hamburgerClose}
                className="header__hamburger-icon"
                alt=""
              />
            </button>
          </div>
        ) : (
          <nav className="header__nav-container">
            <Link to={path} className="header__link header__link_loggedout">
              {navText}
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
