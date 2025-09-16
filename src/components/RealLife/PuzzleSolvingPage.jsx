import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import { categoryData } from './Categories';
import Modal from 'react-modal';
import Sidebar from '../twostep/Sidebar';
import { FaUndo } from 'react-icons/fa';
import { Helmet } from 'react-helmet';
import { useTranslation } from 'react-i18next';
import { useLanguage } from '../../utils/LanguageContext';
import '../../styles/test.css';

Modal.setAppElement('#root');

const PuzzleSolvingPage = () => {
  const { t, i18n } = useTranslation();
  const { categoryId } = useParams();
  const [searchParams] = useSearchParams();
  const puzzleId = searchParams.get('puzzle');
  const navigate = useNavigate();
  const { setShowLanguageSwitcher } = useLanguage();

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(0);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBackModalOpen, setIsBackModalOpen] = useState(false);

  const category = categoryData.find(cat => cat.id === categoryId);
  const puzzle = category?.examples.find(ex => ex.id === puzzleId);

  const puzzleQuestions = puzzle?.questions || [];

  useEffect(() => {
    setShowLanguageSwitcher(false);
    return () => {
      setShowLanguageSwitcher(true);
    };
  }, [setShowLanguageSwitcher]);

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning]);

  const generateRandomId = (length = 7) => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return result;
  };

  const handleSelect = (selectedOption) => {
    const currentQuestion = puzzleQuestions[currentQuestionIndex];
    
    setUserAnswers(prevAnswers => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[currentQuestionIndex] = {
        question: currentQuestion.question,
        selected: selectedOption,
        correct: currentQuestion.correctAnswer,
      };
      return updatedAnswers;
    });
  };

  const handleNext = () => {
    if (currentQuestionIndex < puzzleQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setIsModalOpen(true);
    }
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };
  
  const handleConfirmFinish = () => {
    setIsTimerRunning(false);
    
    const score = userAnswers.filter(
      answer => answer.selected === answer.correct
    ).length;
  
    navigate(`/rlpuzzles/${categoryId}/result`, { 
      state: { 
        score, 
        total: puzzleQuestions.length,
        userAnswers,
        timeTaken: timer,
        usedQuestions: puzzleQuestions,
        timer
      } 
    });
};

  const handleBackToPuzzles = () => {
    setIsBackModalOpen(true);
  };

  const handleConfirmBackToPuzzles = () => {
    setIsBackModalOpen(false);
    navigate('/rlpuzzles');
  };

  const handleQuestionSelect = (index) => {
    setCurrentQuestionIndex(index);
  };

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  if (!puzzle) return <div>{t('noQuestions')}</div>;

  const currentQ = puzzleQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / puzzleQuestions.length) * 100;
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
          {t('questionCounter', { current: currentQuestionIndex + 1, total: puzzleQuestions.length })}
        </div>
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        <div className="question">
          <h2>{currentQ.question}</h2>
        </div>
        <div className="options-container">
          {currentQ.answers.map((option, index) => (
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
            {currentQuestionIndex === puzzleQuestions.length - 1 ? (
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
        questions={puzzleQuestions}
        userAnswers={userAnswers}
        onQuestionSelect={handleQuestionSelect}
      />
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel={t('finishTest')}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{t('confirmFinishTest')}</h2>
        <button onClick={handleConfirmFinish}>{t('yes')}</button>
        <button onClick={() => setIsModalOpen(false)}>{t('no')}</button>
      </Modal>
      <Modal
        isOpen={isBackModalOpen}
        onRequestClose={() => setIsBackModalOpen(false)}
        contentLabel={t('confirmBack')}
        className="modal"
        overlayClassName="overlay"
      >
        <h2>{t('confirmBackMessage')}</h2>
        <button onClick={handleConfirmBackToPuzzles}>{t('yes')}</button>
        <button onClick={() => setIsBackModalOpen(false)}>{t('no')}</button>
      </Modal>
    </div>
  );
};

export default PuzzleSolvingPage;