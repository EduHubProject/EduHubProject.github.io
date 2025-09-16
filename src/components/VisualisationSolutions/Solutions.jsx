import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaLightbulb, 
  FaBook, 
  FaArrowRight 
} from 'react-icons/fa';
import './Solutions.css';

const solutionTypes = [
  {
    id: 'logic',
    title: 'Логический анализ',
    description: 'Декомпозиция сложных проблем на базовые компоненты',
    icon: <FaLightbulb />,
    color: '#6a5acd'
  },
  {
    id: 'practical',
    title: 'Практические кейсы',
    description: 'Реальные сценарии и стратегии решения',
    icon: <FaBook />,
    color: '#4ecdc4'
  },
];

const Solutions = () => {
  return (
    <div className="solutions">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="solutions__header"
      >
        <h1 className="solutions__title">Стратегии решений</h1>
        <p className="solutions__subtitle">
          Системный подход к преодолению интеллектуальных задач
        </p>
      </motion.div>

      <div className="solutions__grid">
        {solutionTypes.map((type, index) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              delay: index * 0.2,
              duration: 0.4
            }}
            className="solutions__card"
          >
            <div 
              className="solutions__card-icon" 
              style={{ color: type.color }}
            >
              {type.icon}
            </div>
            <h2 className="solutions__card-title">{type.title}</h2>
            <p className="solutions__card-description">{type.description}</p>
            <Link 
              to={`/solutions/${type.id}`} 
              className="solutions__card-link"
              style={{ backgroundColor: type.color }}
            >
              Исследовать 
              <FaArrowRight className="solutions__card-link-icon" />
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="solutions__footer"
      >
        <div className="solutions__footer-content">
          <h3>Наш методологический подход</h3>
          <div className="solutions__methodology">
            <div className="solutions__methodology-item">
              <span>Системность</span>
              <p>Целостный анализ без фрагментарности</p>
            </div>
            <div className="solutions__methodology-item">
              <span>Адаптивность</span>
              <p>Гибкие стратегии под конкретную задачу</p>
            </div>
            <div className="solutions__methodology-item">
              <span>Верификация</span>
              <p>Многоуровневая проверка решений</p>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Solutions;