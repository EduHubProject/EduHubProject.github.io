import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { 
  FaBrain, 
  FaPuzzlePiece, 
  FaChessKnight, 
  FaChartLine,
  FaArrowLeft
} from 'react-icons/fa';
import './SolutionType.css';

const complexityIcons = {
  'Низкий': <FaPuzzlePiece className="complexity-icon low" />,
  'Средний': <FaChessKnight className="complexity-icon medium" />,
  'Высокий': <FaBrain className="complexity-icon high" />
};

const solutionTypesData = {
  'logic': {
    title: 'Логический анализ',
    description: 'Системный подход к решению сложных интеллектуальных задач',
    puzzles: [
      {
        id: 'chess-logic',
        title: 'Базовая шахматная стратегия',
        complexity: 'Низкий',
        duration: '5 минут',
        skills: ['Стратегическое мышление', 'Прогнозирование']
      },
      {
        id: 'math-reasoning',
        title: 'Математическое моделирование',
        complexity: 'Средний',
        duration: '45 минут',
        skills: ['Аналитика', 'Абстрактное мышление']
      }
    ]
  },
  'practical': {
    title: 'Практические решения',
    description: 'Прикладные методы и инструменты для эффективного решения задач',
    puzzles: [
      {
        id: 'project-management',
        title: 'Управление проектами',
        complexity: 'Средний',
        duration: '60 минут',
        skills: ['Планирование', 'Координация']
      },
      {
        id: 'financial-analysis',
        title: 'Финансовый анализ',
        complexity: 'Высокий',
        duration: '90 минут',
        skills: ['Экономическая оценка', 'Риск-менеджмент']
      }
    ]
  },
};

const SolutionType = () => {
  const navigate = useNavigate();
  const { solutionType } = useParams(); 
  const currentType = solutionTypesData[solutionType];
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  if (!currentType) {
    return <div>Тип решения не найден</div>;
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="solution-type">
       <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        className="solution-type__header"
        style={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          alignItems: 'center',
          gap: '20px',
          textAlign: 'center',
          padding: isMobile ? '10px' : '20px'
        }}
      >
        <button 
          onClick={handleGoBack} 
          className="go-back-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'transparent',
            border: '2px solid #4ecdc4',
            color: '#4ecdc4',
            padding: '10px 15px',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: isMobile ? '100%' : 'auto',
            justifyContent: 'center',
            marginBottom: isMobile ? '10px' : '0',
            ':hover': {
              background: '#4ecdc4',
              color: 'white',
              transform: 'scale(1.05)'
            }
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#4ecdc4';
            e.target.style.color = 'white';
            e.target.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#4ecdc4';
            e.target.style.transform = 'scale(1)';
          }}
        >
          <FaArrowLeft style={{ marginRight: '10px' }} />
          Назад
        </button>
        
        <div style={{
          flexGrow: 1, 
          textAlign: 'center',
          width: '100%'
        }}>
          <h1 style={{ 
            marginBottom: '10px',
            fontSize: isMobile ? '1.8rem' : '2.5rem'
          }}>
            {currentType.title}
          </h1>
          <p style={{ 
            maxWidth: '800px', 
            margin: '0 auto',
            whiteSpace: 'normal',
            fontSize: isMobile ? '0.9rem' : '1rem',
            padding: isMobile ? '0 10px' : '0'
          }}>
            {currentType.description}
          </p>
        </div>
      </motion.div>

      <div className="solution-type__puzzles">
        {currentType.puzzles.map((puzzle, index) => (
          <motion.div
            key={puzzle.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2 }}
            className="solution-type__puzzle-card"
          >
            <div className="puzzle-card__header">
              <h2>{puzzle.title}</h2>
              <div className="puzzle-card__complexity">
                {complexityIcons[puzzle.complexity]}
                <span>{puzzle.complexity} уровень сложности</span>
              </div>
            </div>

            <div className="puzzle-card__details">
              <div className="puzzle-card__meta">
                <div className="meta-item">
                  <FaChartLine />
                  <span>Длительность: {puzzle.duration}</span>
                </div>
                <div className="puzzle-card__skills">
                  {puzzle.skills.map(skill => (
                    <span key={skill} className="skill-tag">{skill}</span>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              to={`/solutions/${solutionType}/${puzzle.id}`} 
              className="puzzle-card__action"
            >
              Начать решение
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                className="action-icon"
              >
                <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"/>
              </svg>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SolutionType;