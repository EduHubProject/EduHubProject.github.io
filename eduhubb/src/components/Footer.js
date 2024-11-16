import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <nav className="footer__menu menu-footer">
          <ul className="menu-footer__list">
            <li className="menu-footer__item">
              <a href="#main" className="menu-footer__link menu-footer__link_home">Главная</a>
            </li>
            <li className="menu-footer__item">
              <a href="#about" className="menu-footer__link menu-footer__link_about">О проекте</a>
            </li>
            <li className="menu-footer__item">
              <a href="#contacts" className="menu-footer__link menu-footer__link_contacts">Обращение</a>
            </li>
          </ul>
        </nav>
        <div className="footer__social social">
          Разработчик - Потапченко Максим | +7 (778) 546-38-99 
          <a href="https://github.com/EduHubProject/EduHubProject.github.io">- GitHub Сайта</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;