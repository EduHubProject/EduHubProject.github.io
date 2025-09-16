import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import '../styles/puzzles-display.css';
import { Helmet } from 'react-helmet';

Modal.setAppElement('#root');

const Results = () => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
        const message = "Вы уверены, что хотите покинуть страницу? Все несохраненные данные будут потеряны.";
        event.returnValue = message; 
        return message;
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
        window.removeEventListener('beforeunload', handleBeforeUnload);
    };
}, []);
  const { t } = useTranslation(); 
  const location = useLocation();
  const navigate = useNavigate();
  const { score, total, userAnswers, timeTaken, usedQuestions, timer } = location.state || { score: 0, total: 0, userAnswers: [], timeTaken: 0, usedQuestions: [] };
  
  const updatedUserAnswers = userAnswers.map((answer, index) => {
    if (!answer) {
      return {
        question: usedQuestions[index].question,
        selected: null,
        correct: usedQuestions[index].answer,
      };
    }
    return answer;
  });

  const data = [
    { name: t('success'), value: score },
    { name: t('errors'), value: total - score + updatedUserAnswers.filter(answer => !answer).length },
  ];

  const successPercentage = ((score / total) * 100).toFixed(2);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const calculateDifficultyDistribution = (usedQuestions) => {
    return usedQuestions.map((question, index) => ({
      question: `${t('question')} ${index + 1}`, 
      difficulty: question.difficulty 
    }));
  };

  const difficultyData = calculateDifficultyDistribution(usedQuestions);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setDetailModalIsOpen(false);
    setSelectedAnswer(null);
  };

  const openDetailModal = (answer) => {
    setSelectedAnswer(answer);
    setDetailModalIsOpen(true);
  };

  const COLORS = ['#4caf50', '#f44336'];

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000); 
    const milliseconds = Math.floor((time % 1000) / 10); 
    const minutes = Math.floor((totalSeconds / 60) % 60); 
    const hours = Math.floor(totalSeconds / 3600); 

    const formattedTime = [];
    if (hours > 0) {
        formattedTime.push(`${hours} ч.`);
    }
    if (minutes > 0 || hours > 0) {
        formattedTime.push(`${minutes} мин.`); 
    }
    formattedTime.push(`${totalSeconds % 60} сек.`); 
    formattedTime.push(`${milliseconds} мс`); 

    return formattedTime.join(' '); 
};

const timeDisplay = formatTime(timer);

  return (
    <div className="results-container">
      <Helmet>
        <title>{`${t('EduHub')} | ${t('results')}: ${score} ${t('outOf')} ${total}`}</title> 
      </Helmet>
      <h2>{t('resultsTitle')}</h2>
      <p className="score">{t('yourScore')}: <span className="highlight">{score}</span> {t('outOf')} <span className="highlight">{total}</span></p>
      <p className="percentage">{t('successPercentage')}: <span className="highlight">{successPercentage}%</span></p><br />
      <p className="time-taken">{t('timeTaken')}: <span className="highlight">{formatTime(timeTaken)}</span></p>
      <div className="charts-container">
        <div className="line-chart-container">
          <h3>{t('difficultyTitle')}</h3>
          <LineChart width={400} height={300} data={difficultyData}>
            <XAxis dataKey="question" label={{ value: t('questions'), position: 'bottom' }} />
            <YAxis label={{ value: t('difficulty'), angle: -90, position: 'insideLeft' }} />
            <CartesianGrid strokeDasharray="3 3" />
            <RechartsTooltip />
            <Line type="monotone" dataKey="difficulty" stroke="#8884d8" />
          </LineChart>
        </div>
        <div className="chart-container">
          <h3>{t('resultsDistribution')}</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={120}
              fill="#8884d8"
              paddingAngle={5}
              dataKey="value"
              animationBegin={0}
              animationDuration={800}
              animationEasing="ease-in-out"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" align="center" />
          </PieChart>
        </div>
      </div>
      <div className="answer-summary">
  <h3>{t('answerSummary')}</h3>
  <div className="answer-grid">
    {usedQuestions.map((question, index) => {
      const answer = userAnswers[index];

      return (
        <div 
          key={index} 
          className={`answer-cell ${answer && answer.selected === answer.correct ? 'correct' : 'incorrect'}`} 
          onClick={() => openDetailModal(answer || {
            question: question.question,
            selected: null, 
            correct: question.answer,
          })} 
          style={{ cursor: 'pointer' }}
        >
          {index + 1} 
          {answer ? (answer.selected === answer.correct ? <FaCheckCircle className="icon" /> : <FaTimesCircle className="icon" />) : <FaTimesCircle className="icon" />} 
        </div>
      );
    })}
  </div>
</div>
<Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel={t('yourAnswers')} className="modal" overlayClassName="overlay">
  <h2>{t('yourAnswers')}</h2>
  <div className="answer-grid">
    {usedQuestions.map((question, index) => {
      const answer = userAnswers[index] || {
        question: question.question,
        selected: null, 
        correct: question.answer,
      };

      return (
        <div 
          key={index} 
          className={`answer-cell ${answer.selected === answer.correct ? 'correct' : 'incorrect'}`} 
          onClick={() => openDetailModal(answer)} 
          style={{ cursor: 'pointer' }}
        >
          <p>{index + 1}. {answer.question}</p>
          <p><strong>{t('yourAnswer')}:</strong> {answer.selected || '—'}</p>
          <p><strong>{t('correctAnswer')}:</strong> {answer.correct}</p>
        </div>
      );
    })}
  </div>
  <button onClick={closeModal}>{t('close')}</button>
</Modal>
<Modal
  isOpen={detailModalIsOpen}
  onRequestClose={closeModal}
  contentLabel={t('answerDetails')}
  className="modalwindow"
  overlayClassName="overlay"
  ariaHideApp={false}
>
  <h2 className="modalwindow-title">{t('answerDetails')}</h2>
  {selectedAnswer && (
    <div className="modalwindow-content">
      <div className="answer-detail">
        <p className="question"><strong>{t('question')}:</strong> {selectedAnswer.question}</p>
        <div className="answer-buttons">
          <div className="answer-button user-answer">
            <strong>{t('yourAnswer')}:</strong> <span>{selectedAnswer.selected || '—'}</span>
          </div>
          <div className="answer-button correct-answer">
            <strong>{t('correctAnswer')}:</strong> <span>{selectedAnswer.correct}</span>
          </div>
        </div>
        <p className={`result ${selectedAnswer.selected === selectedAnswer.correct ? 'correct' : 'incorrect'}`}>
          {selectedAnswer.selected === selectedAnswer.correct ? t('correct') : t('incorrect')}
        </p>
      </div>
    </div>
  )}
  <button className="modalwindow-close-button" onClick={closeModal}>{t('close')}</button>
</Modal>
      <Link to="/puzzles" className="button-try-again">{t('tryAgain')}</Link>
    </div>
  );
};

export default Results;