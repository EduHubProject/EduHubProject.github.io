import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import Modal from 'react-modal';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip } from 'recharts';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';
import '../../styles/puzzles-display.css';

Modal.setAppElement('#root');

const ResultPage = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const { 
    score = 0, 
    total = 0, 
    userAnswers = [], 
    timeTaken = 0, 
    usedQuestions = []
  } = location.state || {};

  const [detailModalIsOpen, setDetailModalIsOpen] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    if (!location.state) {
      navigate('/rlpuzzles');
    }
  }, [location.state, navigate]);

  const data = [
    { name: t('success'), value: score },
    { name: t('errors'), value: total - score },
  ];

  const successPercentage = ((score / total) * 100).toFixed(2);
  const COLORS = ['#4caf50', '#f44336'];

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time / 1000);
    const milliseconds = String(Math.floor((time % 1000) / 10)).padStart(2, '0');
    let minutes = Math.floor(totalSeconds / 60);
    let seconds = totalSeconds % 60;

    seconds = String(seconds).padStart(2, '0');
    minutes = String(minutes).padStart(2, '0');

    return `${minutes}:${seconds}.${milliseconds}`;
  };

  const openDetailModal = (answer) => {
    setSelectedAnswer(answer);
    setDetailModalIsOpen(true);
  };

  const closeModal = () => {
    setDetailModalIsOpen(false);
    setSelectedAnswer(null);
  };

  return (
    <div className="results-container">
      <Helmet>
        <title>{`${t('EduHub')} | ${t('results')}: ${score} ${t('outOf')} ${total}`}</title>
      </Helmet>
      
      <h2>{t('resultsTitle')}</h2>
      
      <p className="score">{t('yourScore')}: <span className="highlight">{score}</span> {t('outOf')} <span className="highlight">{total}</span></p>
      <p className="percentage">{t('successPercentage')}: <span className="highlight">{successPercentage}%</span></p>
      <p className="time-taken">{t('timeTaken')}: <span className="highlight">{formatTime(timeTaken)}</span></p>
      
      <div className="charts-container">
        <div className="chart-container">
          <h3>{t('resultsDistribution')}</h3>
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx={200}
              cy={200}
              innerRadius={80}
              outerRadius={120}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
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
                {answer?.selected === answer?.correct 
                  ? <FaCheckCircle className="icon" /> 
                  : <FaTimesCircle className="icon" />}
              </div>
            );
          })}
        </div>
      </div>

      <Modal
        isOpen={detailModalIsOpen}
        onRequestClose={closeModal}
        contentLabel={t('answerDetails')}
        className="modalwindow"
        overlayClassName="overlay"
      >
        {selectedAnswer && (
          <div className="modalwindow-content">
            <h2 className="modalwindow-title">{t('answerDetails')}</h2>
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

      <Link to="/rlpuzzles" className="button-try-again">{t('tryAgain')}</Link>
    </div>
  );
};

export default ResultPage;