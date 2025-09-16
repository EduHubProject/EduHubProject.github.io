import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import mainImage from '../assets/main/image.webp';
import aboutImage from '../assets/about/image.webp';
import siteImage from '../assets/works/items/site.webp';
import interactivepuzImage from '../assets/works/items/interactive.webp';
import resultImage from '../assets/works/items/result.webp';
import classRoomImage from '../assets/works/items/classroom.webp';
import puzzleImage from '../assets/works/items/puzzle.webp';
import visualisationImage from '../assets/works/items/visualisation.webp';
import mathresourcesImage from '../assets/works/items/mathresources.webp'
import puzzleforcomImage from '../assets/works/items/puzzleforcom.webp'
import tournamentImage from '../assets/works/items/tournament.webp';
import contactImage from '../assets/contacts/image.svg';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.css';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

const MainSection = React.memo(() => {
  const { t } = useTranslation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
  <section className="main-section page__main" id="main">
  <Helmet>
  <title>{t(`mainEduTitle`)}</title>
  </Helmet>
    <div className="main-section__container">
      <div className="main-section__content">
        <h1 className="main-section__title">{t('tasks')} <span className="main-section__title-accent">{t('life')}</span></h1>
        <div className="main-section__buttons">
          <Link 
            to="/puzzles" 
            className="main-section__button button main-section__button_type_primary"
          >
            {t('puzzles')}
          </Link>
          <Link 
            to="/survey" 
            className="main-section__button button button_dark main-section__button_type_secondary"
          >
            <span>{t('summary')}</span>
          </Link>
      </div>
      </div>
      <div className="main-section__image">
        <img 
          src={mainImage} 
          alt="People and PC" 
          className="main-section__image-pic"
          width="517px" 
          height="597px" 
        />
      </div>
    </div>
  </section>
  );
});

const AboutSection = React.memo(() => {
  const { t } = useTranslation();

  return (
  <section className="about-section page__about" id="about">
    <div className="about-section__container">
      <div className="about-section__content">
        <h2 className="about-section__title title">{t('about')} <span className="about-section__title-accent">{t('project')}</span></h2>
        <div className="about-section__text">
          <p>{t('projectdesc')}</p>
        </div>
      </div>
      <div className="about-section__image">
        <img 
          src={aboutImage} 
          alt="Around digital" 
          loading="lazy" 
          width="656px" 
          height="597px" 
          className="about-section__image-pic"
        />
      </div>
    </div>
  </section>
  );
});

const PracticeWork = React.memo(() => {
  const { t } = useTranslation(); 
  const [activeType, setActiveType] = React.useState('');

  const handleTypeChange = (type) => {
    setActiveType(type);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  const workItems = [
    {
      type: 'digital',
      imageSrc: interactivepuzImage,
      imageAlt: 'Interactive puzzles',
      text: t('interactivePuzzles'), 
      link: '/puzzles', 
    },
    {
      type: 'test',
      imageSrc: resultImage,
      imageAlt: 'Test and answers',
      text: t('testResults'), 
      link: '/survey', 
    },
    {
      type: 'digital',
      imageSrc: classRoomImage,
      imageAlt: 'Classroom',
      text: t('classRoomTitle'), 
      link: '/sgpuzzles', 
    },
    {
      type: 'life',
      imageSrc: puzzleImage,
      imageAlt: 'Real Life Puzzles',
      text: t('realLifePuzzles'), 
      link: '/rlpuzzles', 
    },
    {
      type: 'digital',
      imageSrc: visualisationImage,
      imageAlt: 'Visualisation of solutions',
      text: t('visualisationOfSolutions'), 
      link: '/solutions', 
    },
    {
      type: 'test',
      imageSrc: puzzleforcomImage,
      imageAlt: 'Commission`s puzzles',
      text: t('commissionPuzzles'), 
      link: '/jury-puzzles', 
    },
  ];
  
  return (
    <section className="works-section page__works" id="practice">
      <div className="works-section__container">
        <h2 className="works-section__title title">{t('practicework')}</h2>
        <div className="works-section__items">
          <nav className="works-section__navigation">
            <button 
              data-work-type="" 
              className={`works-section__navigation-item button button_dark ${activeType === '' ? 'active' : ''}`} 
              onClick={() => handleTypeChange('')}
            >
              {t('all')}
            </button>
            <button 
              data-work-type="digital" 
              className={`works-section__navigation-item button button_dark ${activeType === 'digital' ? 'active' : ''}`} 
              onClick={() => handleTypeChange('digital')}
            >
              {t('digital')}
            </button>
            <button 
              data-work-type="test" 
              className={`works-section__navigation-item button button_dark ${activeType === 'test' ? 'active' : ''}`} 
              onClick={() => handleTypeChange('test')}
            >
              {t('tests')}
            </button>
            <button 
              data-work-type="life" 
              className={`works-section__navigation-item button button_dark ${activeType === 'life' ? 'active' : ''}`} 
              onClick={() => handleTypeChange('life')}
            >
              {t('alive')}
            </button>
          </nav>
          <div className="works-section__body">
            {workItems
              .filter((item) => item.type === activeType || activeType === '')
              .map((item, index) => (
                <Link 
                  key={index} 
                  data-work-type={item.type} 
                  to={item.link} 
                  className="works-section__item"
                > 
                  <div className="works-section__item-image">
                    <picture>
                      <source srcSet={item.imageSrc} type="image/webp" />
                      <img 
                        src={item.imageSrc.replace('.webp', '.jpg')} 
                        alt={item.imageAlt} 
                        loading="lazy" 
                      />
                    </picture>
                  </div>
                  {item.text}
                </Link>
              ))
            }
          </div>
        </div>
      </div>
    </section>
  );
});


const ContactSection = React.memo(() => {
    const { t } = useTranslation();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [isCooldown, setIsCooldown] = useState(false);
    const [cooldownTime, setCooldownTime] = useState(5); 
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        let interval;
        if (isCooldown) {
            interval = setInterval(() => {
                setCooldownTime((prev) => {
                    if (prev <= 1) {
                        clearInterval(interval);
                        setIsCooldown(false);
                        return 5; 
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isCooldown]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (honeypot) {
            setError(t('formAuto'));
            return;
        }

        if (isCooldown) {
          toast.info(`${t('pleaseWait')} ${cooldownTime} ${t('lastWait')}.`);
          return;
        }

        const formData = new FormData();
        formData.append('Имя', name);
        formData.append('Email', email);
        formData.append('Обращение', message);

        setIsLoading(true);

        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxkLlixjPn2qSDzPLqq2jcrDonsh6M8PrADyJrpvs-3_dSOrfr348Agr9RM2AXryeOQ6Q/exec', {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error('Сервер вернул ошибку. Статус: ' + response.status);
            }

            const data = await response.json();

            if (data.result === "Success") {
                toast.success(`${t('thanksForSubmit')} + ${name}! ${t('contactWithUser')}`, {
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setError('');
                setName('');
                setEmail('');
                setMessage('');
                setHoneypot('');
                setIsCooldown(true);
                setCooldownTime(5); 
            } else if (data.error) {
                setError(data.error);
                toast.error(data.error, {
                    autoClose: 5000,
                });
            } else {
                setError('Произошла ошибка при отправке формы.');
                toast.error(`${t('error')}`, {
                    autoClose: 5000,
                });
            }
        } catch (error) {
            setError('Произошла ошибка при отправке формы: ' + error.message);
            toast.error(`${t('error')}` + error.message);
            console.error('Ошибка:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
      <section className="contacts-section page__contacts" id="contacts">
          <div className="contacts-section__container">
              <div className="contacts-section__content">
                  <h2 className="contacts-section__title title">
                      {t('uCanHelp')} <span className="contacts-section__title-accent">{t('forProject')}</span>
                  </h2>
                  <div className="contacts-section__image">
                      <img 
                          src={contactImage} 
                          alt="Contact Photo" 
                          className="contacts-section__image-pic"
                      />
                  </div>
                  {error && <div className="contacts-section__error">{error}</div>} 
              </div>
              <form 
                  onSubmit={handleSubmit} 
                  autoComplete="off" 
                  className="contacts-section__form"
              >
                  <div className="contacts-section__form-item">
                      <label 
                          htmlFor="i-1" 
                          className="contacts-section__form-label"
                      >
                          {t('urName')}
                      </label>
                      <input
                          name="Имя"
                          required
                          id="i-1"
                          type="text"
                          className="contacts-section__form-input"
                          placeholder={t('justName')}
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className="contacts-section__form-item">
                      <label 
                          htmlFor="i-2" 
                          className="contacts-section__form-label"
                      >
                          {t('urEmail')}
                      </label>
                      <input
                          name="Email"
                          required
                          id="i-2"
                          type="email"
                          className="contacts-section__form-input"
                          placeholder={t('justEmail')}
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className="contacts-section__form-item">
                      <label 
                          htmlFor="i-3" 
                          className="contacts-section__form-label"
                      >
                          {t('urMessage')}
                      </label>
                      <textarea
                          name="Обращение"
                          required
                          id="i-3"
                          className="contacts-section__form-input contacts-section__form-input_type_textarea"
                          placeholder={t('justMessage')}
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                  </div>
                  <div className="contacts-section__form-item">
                      <input
                          type="text"
                          name="honeypot"
                          style={{ display: 'none' }} 
                          value={honeypot}
                          onChange={(e) => setHoneypot(e.target.value)} 
                      />
                  </div>
                  <div className="contacts-section__form-item">
                      <button 
                          type="submit" 
                          className="contacts-section__form-button button button_dark" 
                          disabled={isCooldown || isLoading}
                      >
                          <span className="contacts-section__form-button-text">
                              {isLoading 
                                  ? `${t('submitting')}` 
                                  : (isCooldown 
                                      ? `${t('pleaseWait')} ${cooldownTime} ${t('lastWait')}.` 
                                      : `${t('submit')}`)
                              }
                          </span>
                      </button>
                  </div>
              </form>
              <ToastContainer /> 
          </div>
      </section>
  ); 
});


export { MainSection, AboutSection, PracticeWork, ContactSection };