import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import mainImage from '../assets/main/image.webp';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/style.css';

const MainSection = React.memo(() => (
  <section className="page__main main" id="main">
    <div className="main__container">
      <div className="main__content">
        <h1 className="main__title">ЗАДАЧИ <span>ЖИЗНИ</span></h1>
        <div className="main__buttons">
          <Link to="/" className="main__hire-button button">Головоломки</Link>
          <Link to="/" className="main__hire-button button button_dark">
            <span>Сводка по анкете</span>
          </Link>
        </div>
      </div>
      <div className="main__image">
        <img src={mainImage} alt="People and PC" width="517px" height="597px" />
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
        <img src='/assets/about/image.webp' alt="Around digital" loading="lazy" width="656px" height="597px" />
      </div>
    </div>
  </section>
));

const workItems = [
  {
    type: 'digital',
    imageSrc: '/assets/works/items/site.webp',
    imageAlt: 'SiteDigital',
    text: 'Сайт для новейшего подхода в обучение',
    link: 'http://dailyfes.beget.tech/',
  },
  {
    type: 'digital',
    imageSrc: '/assets/works/items/forum.webp',
    imageAlt: 'Forum for Digital',
    text: 'Тематический форум для помощи в решении головоломок',
    link: '/',
  },
  {
    type: 'test',
    imageSrc: '/assets/works/items/result.webp',
    imageAlt: 'Test and answers',
    text: 'Вопросы и результаты анкетирования',
    link: '/',
  },
  {
    type: 'digital',
    imageSrc: '/assets/works/items/digitalpuz.webp',
    imageAlt: 'Digital Puzzles for practice',
    text: 'Цифровые головоломки и решения их',
    link: '/',
  },
  {
    type: 'life',
    imageSrc: '/assets/works/items/puzzle.webp',
    imageAlt: 'Real Life Puzzles',
    text: 'Головоломки вживую',
    link: '/',
  },
  {
    type: 'test',
    imageSrc: '/assets/works/items/puzzleforcom.webp',
    imageAlt: 'Commision`s puzzles',
    text: 'Головоломки и задачи для комиссии',
    link: '/',
  },
];

const PracticeWork = React.memo(() => {
  const [activeType, setActiveType] = React.useState('');

  const handleTypeChange = (type) => {
    setActiveType(type);
  };

  return (
    <section className="page__works works" id="practice">
      <div className="works__container">
        <h2 className="works__title title">Практическая работа</h2>
        <div className="works__items items-works">
          <nav className="items-works__navigation">
            <button data-work-type="" className={`items-works__type button button_dark ${activeType === '' ? 'active' : ''}`} onClick={() => handleTypeChange('')}>Все</button>
            <button data-work-type="digital" className={`items-works__type button button_dark ${activeType === 'digital' ? 'active' : ''}`} onClick={() => handleTypeChange('digital')}>Цифровое</button>
            <button data-work-type="test" className={`items-works__type button button_dark ${activeType === 'test' ? 'active' : ''}`} onClick={() => handleTypeChange('test')}>Анкеты</button>
            <button data-work-type="life" className={`items-works__type button button_dark ${activeType === 'life' ? 'active' : ''}`} onClick={() => handleTypeChange('life')}>Живое</button>
          </nav>
          <div className="items-works__body">
            {workItems.filter((item) => item.type === activeType || activeType === '').map((item, index) => (
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

const ContactSection = React.memo(() => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault(); // Предотвращаем стандартное поведение формы

    const formData = new FormData();
    formData.append('Имя', name);
    formData.append('Email', email);
    formData.append('Обращение', message);

    console.log('Отправка данных:', { name, email, message }); // Отладка

    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbxkLlixjPn2qSDzPLqq2jcrDonsh6M8PrADyJrpvs-3_dSOrfr348Agr9RM2AXryeOQ6Q/exec', {
            method: 'POST',
            body: formData,
        });

        // Проверяем, был ли запрос успешным
        if (!response.ok) {
            // Если статус ответа не 2xx, выбрасываем ошибку
            throw new Error('Сервер вернул ошибку. Статус: ' + response.status);
        }

        const data = await response.json(); // Получаем JSON-ответ
        console.log('Ответ от сервера:', data); // Отладка

        // Проверяем, является ли результат успешным
        if (data.result === "Success") {
            toast.success(`Спасибо за ваше обращение, ${name}! Мы свяжемся с вами в ближайшее время.`, {
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
        } else if (data.error) {
            // Если есть ошибка, выведем сообщение об ошибке
            toast.error(data.error, {
                autoClose: 5000,
            });
        } else {
            // Если ответ не содержит ошибки, но не был успешным
            toast.error('Произошла ошибка при отправке формы.', {
                autoClose: 5000,
            });
        }
    } catch (error) {
        toast.error('Произошла ошибка при отправке формы: ' + error.message);
        console.error('Ошибка:', error); // Отладка
    }
};

  return (
      <section className="page__contacts contacts">
          <div className="contacts__container">
              <div className="contacts__content">
                  <h2 className="contacts__title title">Вы можете помочь <span>проекту!</span></h2>
              </div>
              <form onSubmit={handleSubmit} autoComplete="off" className="contacts__form form">
                  <div className="form__item">
                      <label htmlFor="i-1" className="form__label">Ваше имя</label>
                      <input
                          name="Имя"
                          required
                          id="i-1"
                          type="text"
                          className="form__input"
                          placeholder="Имя"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                      />
                  </div>
                  <div className="form__item">
                      <label htmlFor="i-2" className="form__label">Ваша почта</label>
                      <input
                          name="Email"
                          required
                          id="i-2"
                          type="email"
                          className="form__input"
                          placeholder="Почта"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                      />
                  </div>
                  <div className="form__item">
                      <label htmlFor="i-3" className="form__label">Ваше обращение</label>
                      <textarea
                          name="Обращение"
                          required
                          id="i-3"
                          className="form__input"
                          placeholder="Обращение"
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                      ></textarea>
                  </div>
                  <div className="form__item">
                      <button type="submit" className="form__button button button_dark"><span>Отправить</span></button>
                  </div>
              </form>
              <ToastContainer /> {/* Добавьте этот компонент для отображения уведомлений */}
          </div>
      </section>
  );
});


export default { MainSection, AboutSection, PracticeWork, ContactSection };