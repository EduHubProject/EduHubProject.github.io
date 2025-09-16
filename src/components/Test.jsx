import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { generateQuestions } from '../utils/generateQuestions';
import Modal from 'react-modal';
import Sidebar from './twostep/Sidebar';
import { useTranslation } from 'react-i18next'; 
import '../styles/test.css';
import { FaUndo } from 'react-icons/fa';
import { useLanguage } from '../utils/LanguageContext';
import { Helmet } from 'react-helmet';

Modal.setAppElement('#root');

const Test = () => {
  const { t, i18n } = useTranslation(); 
  const { puzzleType } = useParams();
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [score, setScore] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [questionCount, setQuestionCount] = useState(10);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('Лёгкий'); 
  const [timer, setTimer] = useState(0); 
  const [isTimerRunning, setIsTimerRunning] = useState(true); 
  const [usedQuestions, setUsedQuestions] = useState([]);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);
  const { setShowLanguageSwitcher } = useLanguage(); 

  const generateRandomId = (length = 7) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleBackToPuzzles = () => {
    setIsBackModalOpen(true); 
  };

  const handleConfirmBackToPuzzles = () => {
    setIsBackModalOpen(false);
    navigate('/puzzles'); 
  };

  const handleCancelBackToPuzzles = () => {
    setIsBackModalOpen(false);
  };

  const handleConfirmFinish = () => {
    setIsTimerRunning(false); 
    const correctAnswersCount = userAnswers.filter(answer => answer && answer.selected === answer.correct).length;

    const randomId = generateRandomId(); 

    navigate(`/results/${randomId}`, {
      state: {
        score: correctAnswersCount, 
        total: questions.length,
        userAnswers,
        timeTaken: timer, 
        usedQuestions: questions
      },
    });
  };
+

useEffect(() => {
  setShowLanguageSwitcher(false); 

  return () => {
    setShowLanguageSwitcher(true);
  };
}, [setShowLanguageSwitcher]);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const difficultyParam = queryParams.get('difficulty');
    if (difficultyParam) {
      setDifficulty(difficultyParam);
    }
    const fetchedQuestions = generateQuestions(puzzleType, questionCount, difficulty, i18n.language);
    setQuestions(fetchedQuestions);
  }, [puzzleType, questionCount, difficulty, i18n.language]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 10); 
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const handleSelect = (selectedOption) => {
    const currentQuestion = questions[currentQuestionIndex];
  
    setUserAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.answer,
      };
  
      if (selectedOption === currentQuestion.answer) {
        setScore(prevScore => prevScore + 1); 
      }
  
      return updatedAnswers; 
    });
  };
  
  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleCancelFinish = () => {
    setIsModalOpen(false);
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  if (questions.length === 0) return <div>{t('noQuestions')}</div>; 

  const { question, options } = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100; 
  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');

    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60; 

    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    if (minutes >= 60) {
        const hours = Math.floor(minutes / 60);
        minutes = String(minutes % 60).padStart(2, '0'); 
        return `${hours}:${minutes}:${seconds}.${milliseconds}`; 
    }

    return `${minutes}:${seconds}.${milliseconds}`; 
};

const timeDisplay = formatTime(timer);

  return (
    <div className="test-container">
      <Helmet>
        <title>{t('testTitle')}</title> 
      </Helmet>
      <div className="main-content">
        <div className="timer">
          {timeDisplay}
        </div>
        <div className="question-counter">
          {t('questionCounter', { current: currentQuestionIndex + 1, total: questions.length })} 
        </div>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="question">
          <h2>{question}</h2>
        </div>
        <div className="options-container">
          {options.map((option, index) => (
            <button
              key={index}
              className={`option-button ${userAnswers[currentQuestionIndex]?.selected === option ? 'selected' : ''}`}
              onClick={() => handleSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          <div className="left-buttons">
            {currentQuestionIndex > 0 && (
              <button className="back-button" onClick={handleBack}>{t('back')}</button>
            )}
            {currentQuestionIndex === questions.length - 1 ? (
              <button className="finish-button" onClick={handleNext}>{t('finish')}</button> 
            ) : (
              <button className="next-button" onClick={handleNext}>{t('next')}</button>
            )} 
          </div>
          <button className="back-to-puzzles-button" onClick={handleBackToPuzzles}>
            <FaUndo className="back-icon" /> 
          </button>
        </div>
      </div>
      <Sidebar
        questions={questions}
        userAnswers={userAnswers}
        onQuestionSelect={handleQuestionSelect}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={handleCancelFinish}
        contentLabel={t('finishTest')} 
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{t('confirmFinishTest')}</h2> 
        <button onClick={handleConfirmFinish}>{t('yes')}</button> 
        <button onClick={handleCancelFinish}>{t('no')}</button> 
      </Modal>
      <Modal
        isOpen={isBackModalOpen}
        onRequestClose={handleCancelBackToPuzzles }
        contentLabel={t('confirmBack')} 
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{t('confirmBackMessage')}</h2> 
        <button onClick={handleConfirmBackToPuzzles}>{t('yes')}</button> 
        <button onClick={handleCancelBackToPuzzles}>{t('no')}</button> 
      </Modal>
    </div>
  );
};

export default Test;