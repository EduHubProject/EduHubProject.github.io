import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';
import mainImage from '../assets/main/image.svg';
import { memo } from 'react';
import '../styles/style.css';

const MainSection = React.memo(() => (
    <section className="page__main main" id="main">
      <div className="main__container">
        <div className="main__content">
          <h1 className="main__title">ЗАДАЧИ <span>ЖИЗНИ</span></h1>
          <div className="main__buttons">
            <Link to="/project/practice/puzzles" className="main__hire-button button">Головоломки</Link>
            <Link to="/project/practice/result" className="main__hire-button button button_dark">
              <span>Сводка по анкете</span>
            </Link>
          </div>
        </div>
        <div className="main__image">
          <img src={mainImage} alt="Main Image" loading="lazy" />
        </div>
      </div>
    </section>
  ));

  const AboutSection = React.memo(() => (
    <section className="page__about about" id="about">
      <div className="about__container">
        <div className="about__content">
          <h2 className="about__title title">О <span>проекте</span></h2>
          <div className="about__text">
            <p>
              Проект создан с целью показать, как работает введение новшеств в плане решения головоломок и задач. Мы хотим показать, 
              как нейросети в скором плотно войдут в нашу жизнь, как они помогают нам решать повседневные задачи, какие головоломки 
              развивают нам мозг и с какими задачами мы встречаемся в повседневной жизни. Этим проектом мы хотим показать ценность 
              решения математических головоломок и ценность нейросетей в нашей жизни, прогнозирование на будущую популярность нейросетей среди людей.
            </p>
          </div>
        </div>
        <div className="about__image">
          <img src='/assets/about/image.webp' alt="About Image" loading="lazy" />
        </div>
      </div>
    </section>
  ));

  const workItems = [
    {
      type: 'digital',
      imageSrc: '/assets/works/items/site.webp',
      imageAlt: 'Сайт для новейшего подхода в обучение',
      text: 'Сайт для новейшего подхода в обучение',
      link: 'http://dailyfes.beget.tech/',
    },
    {
      type: 'digital',
      imageSrc: '/assets/works/items/digitalpuz.webp',
      imageAlt: 'Тематический форум для помощи в решении головоломок',
      text: 'Тематический форум для помощи в решении головоломок',
      link: '/practice/puzzles.html',
    },
    {
      type: 'test',
      imageSrc: '/assets/works/items/result.webp',
      imageAlt: 'Вопросы и результаты анкетирования',
      text: 'Вопросы и результаты анкетирования',
      link: '/practice/result.html',
    },
    {
      type: 'digital',
      imageSrc: '/assets/works/items/digitalpuz.webp',
      imageAlt: 'Цифровые головоломки и решения их',
      text: 'Цифровые головоломки и решения их',
      link: '/practice/puzzles.html',
    },
    {
      type: 'life',
      imageSrc: '/assets/works/items/puzzle.webp',
      imageAlt: 'Головоломки вживую',
      text: 'Головоломки вживую',
      link: '/practice/lifepuzzles.html',
    },
    {
      type: 'test',
      imageSrc: '/assets/works/items/puzzleforcom.webp',
      imageAlt: 'Головоломки и задачи для комиссии',
      text: 'Головоломки и задачи для комиссии',
      link: '/practice/compuzzles.html',
    },
  ];
  
  const PracticeWork = React.memo(() => {
    return (
      <section className="page__works works">
        <div className="works__container">
          <h2 className="works__title title">Практическая работа</h2>
          <div className="works__items items-works">
            <nav className="items-works__navigation">
              <button data-work-type="" className="items-works__type button button_dark active">Все</button>
              <button data-work-type="digital" className="items-works__type button button_dark">Цифровое</button>
              <button data-work-type="test" className="items-works__type button button_dark">Анкеты</button>
              <button data-work-type="life" className="items-works__type button button_dark">Живое</button>
            </nav>
            <div className="items-works__body">
              {workItems.map((item, index) => (
                <a key={index} data-work-type={item.type} href={item.link} className="items-works__item">
                  <div className="item-works__image">
                    <picture>
                      <source srcSet={item.imageSrc} type="image/webp" />
                      <img src={item.imageSrc.replace('.webp', '.jpg')} alt={item.imageAlt} loading="lazy" />
                    </picture>
                  </div>
                  {item.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  });

export { MainSection, AboutSection, PracticeWork };