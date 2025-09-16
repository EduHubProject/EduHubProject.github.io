import React from 'react';
import { motion } from 'framer-motion';
import './PuzzlesPage.css';
import grade1 from './images/1 grade.webp';
import grade2 from './images/2 grade.webp';
import grade3 from './images/3 grade.webp';
import grade4 from './images/4 grade.webp';

const puzzleClasses = [
  { 
    number: 1, 
    disabled: true, 
    image: grade1,
    puzzleCount: '-',
    difficulty: '-',
  },
  { 
    number: 2, 
    disabled: true, 
    image: grade2,
    puzzleCount: '-',
    difficulty: '-',
  },
  { 
    number: 3, 
    disabled: true,
    image: grade3,
    puzzleCount: '-',
    difficulty: '-',
  },
  { 
    number: 4, 
    disabled: false, 
    image: grade4,
    puzzleCount: 90,
    difficulty: 'Начальный',
    link: '/puzzle-categories'
  }
];
const PuzzlesPage = () => {
    return (
        <section className="puzzles-section">
          <div className="puzzles-section__container">
            <h2 className="puzzles-section__title">
              Головоломки для <span>начальных классов</span>
            </h2>
            <div className="puzzles-grid">
              {puzzleClasses.map((classItem) => (
                <motion.div
                  key={classItem.number}
                  className={`puzzles-card ${classItem.disabled ? 'disabled' : 'active'}`}
                  whileHover={!classItem.disabled ? { 
                    scale: 1.05,
                    transition: { duration: 0.2 }
                  } : {}}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ 
                    opacity: 1, 
                    scale: classItem.disabled ? 0.9 : 1,
                    zIndex: classItem.disabled ? 1 : 10
                  }}
                  transition={{ 
                    duration: 0.4,
                    ease: "easeInOut"
                  }}
                >
                 <a href={classItem.link}>
                  <div 
                    className="puzzles-card__background" 
                    style={{
                      backgroundImage: `url(${classItem.image})`,
                      filter: classItem.disabled ? 'grayscale(100%) brightness(0.6)' : 'none'
                    }}
                  >
                    {classItem.disabled && (
                      <div className="puzzles-card__soon-overlay">
                        <span>Скоро</span>
                      </div>
                    )}
                    <div className="puzzles-card__content-overlay">
                      <div className="puzzles-card__content">
                        <div className="puzzles-card__header">
                          <h3>{classItem.number} класс</h3>
                        </div>
                        <div className="puzzles-card__footer">
                          <div className="puzzles-card__details">
                            <span>Головоломок: {classItem.puzzleCount}</span>
                            <span>Сложность: {classItem.difficulty}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      );
    };
    
    export default PuzzlesPage;