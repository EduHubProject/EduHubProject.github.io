import React, { useEffect } from 'react';
import '../styles/style.css';

const Header = () => {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <a href="#main"><img src='/assets/eduhub.webp' alt="Logotype EduHub" /></a>
        </div>
        <nav className="header__menu menu">
          <ul className="menu__list">
            <li className="menu__item"><a href="#main" className="menu__link">Главная</a></li>
            <li className="menu__item"><a href="#about" className="menu__link">О проекте</a></li>
            <li className="menu__item">
              <a href="#practice" className="menu__link"><i className="fas fa-globe" alt="Practice"></i></a>
            </li>
            <li className="menu__item"><a href="#contacts" className="menu__link">Обращение</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;