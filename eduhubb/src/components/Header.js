import React from 'react';
import '../styles/style.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="#main"><img src='/assets/eduhub.webp' alt="Logo" /></a>
        </div>
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item">
              <a href="#main" className="menu__link">Главная</a>
            </li>
            <li className="menu__item">
              <a href="#about" className="menu__link">О проекте</a>
            </li>
            <li className="menu__item">
              <a href="#contacts" className="menu__link">Обращение</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
