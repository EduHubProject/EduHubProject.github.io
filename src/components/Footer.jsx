  import React, { useState, useRef, useEffect } from 'react';
  import '../styles/footer.css';
  import { useTranslation } from 'react-i18next';

  const Footer = () => {
    const { t } = useTranslation();
    const [currentIndex, setCurrentIndex] = useState(0);
    const items = [
      { text: `${t('tutorial')}`, link: '/#item2' }, 
      { text: `${t('sourceCodeSite')}`, link: '/#item1' },
      { text: `${t('siteGithub')}`, link: 'https://github.com/EduHubProject/EduHubProject.github.io' },
    ];
    const itemRefs = useRef([]);
    useEffect(() => {
      window.scrollTo(0, 0);
    }, []);
    
    useEffect(() => {
      const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
          } else {
            entry.target.style.opacity = '0';
          }
        });
      }, observerOptions);

      itemRefs.current.forEach((item) => {
        if (item) {
          observer.observe(item);
        }
      });

      return () => {
        itemRefs.current.forEach((item) => {
          if (item) {
            observer.unobserve(item);
          }
        });
      };
    }, [items]);

    const nextItem = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevItem = () => {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    return (
      <footer className="footer-section">
        <div className="footer-section__container">
          <nav className="footer-section__menu">
            <ul className="footer-section__menu-list">
              <li className="footer-section__menu-item">
                <a href="/#main" className="footer-section__menu-link footer-section__menu-link_type_home">{t('main')}</a>
              </li>
              <li className="footer-section__menu-item">
                <a href="/#about" className="footer-section__menu-link footer-section__menu-link_type_about">{t('navabout')}</a>
              </li>
              <li className="footer-section__menu-item">
                <a href="/#contacts" className="footer-section__menu-link footer-section__menu-link_type_contacts">{t('contacts')}</a>
              </li>
            </ul>
          </nav>
          <div className="footer-section__social">
            {t('developerSite')} | 
            <a href="tel:+77785463899" className="footer-section__text">+7 (778) 546-38-99 </a>
          </div>
        </div>
        <div className="footer-section__carousel">
          <button className="footer-section__nav-button footer-section__nav-button_direction_left" onClick={prevItem}>&#9664;</button> 
          <div className="footer-section__carousel-items" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
            {items.map((item, index) => (
              <div key={index} className="footer-section__carousel-item" ref={(el) => (itemRefs.current[index] = el)}>
                <a href={item.link}>
                  <p>{item.text}</p> 
                </a>
              </div>
            ))}
          </div>
          <button className="footer-section__nav-button footer-section__nav-button_direction_right" onClick={nextItem}>&#9654;</button>
        </div>
      </footer>
    );
  };

  export default Footer;