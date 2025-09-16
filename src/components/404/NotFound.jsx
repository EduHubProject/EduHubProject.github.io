import React from 'react';
import { useTranslation } from 'react-i18next'; 
import { Link } from 'react-router-dom'; 
import './NotFound.css'; 
import { Helmet } from 'react-helmet';

const NotFound = () => {
  const { t } = useTranslation(); 

  return (
    <div className="not-found-container">
      <Helmet>
        <title>{`EduHub | Страница не найдена`}</title> 
      </Helmet>
      <h1 className="error-title">{t('pageNotFoundTitle')}</h1>
      <h2 className="sub-title">{t('pageNotFoundSubtitle')}</h2>

      <div className="info-section">
        <p className="info-text">{t('pageNotFoundInfo')}</p>
      </div>

      <div className="navigation">
        <Link to="/" className="main-button">{t('pageNotFoundMainButton')}</Link>
        <Link to="/sections" className="sections-button">{t('pageNotFoundSectionsButton')}</Link>
      </div>
    </div>
  );
};

export default NotFound;