import React, { useEffect, useState, useRef } from 'react';
import Logo from '../assets/eduhub.webp';
import { useTranslation } from 'react-i18next';
import '../styles/header.css';
import { useLanguage } from '../utils/LanguageContext';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isIconRotated, setIsIconRotated] = useState(false);
  const dropdownRef = useRef(null);
  const { showLanguageSwitcher } = useLanguage();


  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setIsDropdownOpen(false); 
    setIsIconRotated(false); 
  }; 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setIsIconRotated(!isIconRotated); 
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setIsIconRotated(false); 
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
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
<header className="header-section">
  <div className="header-section__container">
    <div className="header-section__logo">
      <a href="/#main"><img src={Logo} alt="Logotype EduHub" /></a>
    </div>
    <nav className="header-section__menu">
      <ul className="header-section__menu-list">
        <li className="header-section__menu-item">
          <a href="/#main" className="header-section__menu-link">{t('main')}</a>
        </li>
        <li className="header-section__menu-item">
          <a href="/#about" className="header-section__menu-link">{t('navabout')}</a>
        </li>
        <li className="header-section__menu-item">
          <a href="/#practice" className="header-section__menu-link">{t('practice')}</a>
        </li>
        <li className="header-section__menu-item">
          <a href="/#contacts" className="header-section__menu-link">{t('contacts')}</a>
        </li>
      </ul>
    </nav>
    {showLanguageSwitcher && (
      <div className="header-section__language-switcher language-switcher">
        <button 
          onClick={toggleDropdown} 
          className="language-switcher__button"
        >
          {i18n.language.toUpperCase()} 
          <span className={`language-switcher__icon ${isIconRotated ? 'language-switcher__icon_rotated' : ''}`}>▼</span>
        </button>
        {isDropdownOpen && (
          <div className="language-switcher__dropdown">
            <button onClick={() => changeLanguage('ru')}>RU</button>
            <button onClick={() => changeLanguage('en')}>EN</button>
            <button onClick={() => changeLanguage('kz')}>KK</button>
          </div>
        )}
      </div>
    )}
  </div>
</header>
  );
};

export default Header;