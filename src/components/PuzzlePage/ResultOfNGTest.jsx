import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import confetti from 'canvas-confetti';

import { 
    getPuzzleCategories,
    updatePuzzleCategories,
    CHARACTERS, 
    LEVEL_THRESHOLDS 
} from './PuzzleConstantsNG';

import './ResultOfNGTest.css';

const ResultOfNGTest = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const { 
        score = 0, 
        totalPuzzles = 0, 
        solvedPuzzles = [], 
        // achievements = [], 
        timeTaken = 0,
        category,
        playerLevel,
        completedCategories = {}
    } = location.state || {};

    useEffect(() => {
        // Используем функцию getPuzzleCategories
        const savedCategories = localStorage.getItem('PUZZLE_CATEGORIES');
        const parsedCategories = savedCategories 
            ? JSON.parse(savedCategories) 
            : getPuzzleCategories();

        // Обновляем статус категории
        const updatedCategories = parsedCategories.map(cat => {
            if (cat.id === category.id) {
                return {
                    ...cat,
                    finished: solvedPuzzles.length === totalPuzzles
                };
            }
            return cat;
        });

        // Обновляем глобальную константу
        updatePuzzleCategories(updatedCategories);

        // Сохраняем в localStorage
        localStorage.setItem('PUZZLE_CATEGORIES', JSON.stringify(updatedCategories));

        // Логирование для отладки
        console.log('Updated Categories:', updatedCategories);

        // Анимация конфетти
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#00ADB5', '#393E46', '#222831']
        });
    }, [category, solvedPuzzles, totalPuzzles]);

    const isFirstRender = useRef(true);

    useEffect(() => {
        // Если это первый рендер - выходим
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }

        // Обновляем общий счет
        const savedTotalScore = parseInt(localStorage.getItem('totalScore') || '0');
        const newTotalScore = savedTotalScore + score;
        
        localStorage.setItem('totalScore', newTotalScore.toString());

        // Определяем уровень по LEVEL_THRESHOLDS
        const determinePlayerLevel = (totalScore) => {
            if (totalScore < LEVEL_THRESHOLDS[1]) return 0;
            if (totalScore < LEVEL_THRESHOLDS[2]) return 1;
            if (totalScore < LEVEL_THRESHOLDS[3]) return 2;
            return 3;
        };

        const newPlayerLevel = determinePlayerLevel(newTotalScore);
        localStorage.setItem('playerLevel', newPlayerLevel.toString());
        
        // Логирование для отладки
        console.log('Новый общий счет:', newTotalScore);
        console.log('Новый уровень:', CHARACTERS.math_hero.levelNames[newPlayerLevel]);

    }, [score]);

    const calculatePerformance = () => {
        const accuracyPercentage = (solvedPuzzles.length / totalPuzzles) * 100;
        
        const formatTime = (ms) => {
            const seconds = Math.floor(ms / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
    
            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;
    
            return `${formattedMinutes}:${formattedSeconds}`;
        };
    
        const getTimeRecommendation = () => {
            const averageTimePerPuzzle = timeTaken / totalPuzzles;
            
            if (averageTimePerPuzzle < 10000) return "Молниеносная скорость!";
            if (averageTimePerPuzzle < 20000) return "Очень быстро!";
            if (averageTimePerPuzzle < 30000) return "Хороший темп.";
            return "Есть возможность ускориться.";
        };
    
        return {
            accuracyPercentage: Math.round(accuracyPercentage),
            timeTaken: formatTime(timeTaken),
            timeRecommendation: getTimeRecommendation()
        };
    };

    const getResultTitle = () => {
        if (score > 500) return "Ты просто СУПЕР! 🌟";
        if (score > 250) return "Отличная работа! 👏";
        return "Молодец! Продолжай стараться! 💪";
    };

    const statsVariants = {
        hidden: { opacity: 0, y: 50 },
        visible: { 
            opacity: 1, 
            y: 0,
            transition: { 
                duration: 0.5,
                type: "spring",
                stiffness: 100 
            }
        }
    };

  {/*  const renderAchievementBadges = () => {
        return achievements.map((achievement, index) => (
            <motion.div 
                key={achievement.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                    delay: index * 0.2,
                    type: "spring",
                    stiffness: 300 
                }}
                className="achievement-badge-big"
            >
                <span className="achievement-icon">{achievement.icon}</span>
                <span className="achievement-name">{achievement.name}</span>
            </motion.div>
        ));
    };
*/}
    const handleBackToCategories = () => {
        navigate('/puzzle-categories');
    };

    const performanceStats = calculatePerformance();

    return (
        <motion.div 
            className="result-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
        >
            <div className="result-container">
                <div className="result-left-column">
                    <motion.h1 
                        className="result-title"
                        initial={{ scale: 0.5 }}
                        animate={{ scale: 1 }}
                    >
                        {getResultTitle()}
                    </motion.h1>

                    <motion.div 
                        className="score-section"
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="score-bubble">
                            <span className="score-value">{score}</span>
                            <span className="score-label">Очков</span>
                        </div>
                    </motion.div>
                </div>

                <div className="result-right-column">
                    <motion.div 
                        className="stats-grid"
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="stat-card">
                            <h3>Решено задач</h3>
                            <div className="stat-value">
                                {solvedPuzzles.length} / {totalPuzzles}
                            </div>
                        </div>
                        <div className="stat-card">
                            <h3>Уровень</h3>
                            <div className="stat-value">
                                {CHARACTERS.math_hero.levelNames[playerLevel]}
                            </div>
                        </div>
                    </motion.div>
                    {/*
                    <motion.div 
                        className="achievements-section"
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <h2>Твои достижения</h2>
                        <div className="achievements-grid">
                            {renderAchievementBadges()}
                        </div>
                    </motion.div>
                    */}
                    <motion.div 
                        className="performance-section"
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="performance-stats">
                            <div className="performance-card">
                                <h3>Точность решения</h3>
                                <div className="performance-value">
                                    {performanceStats.accuracyPercentage}%
                                </div>
                            </div>
                            <div className="performance-card">
                                <h3>Время прохождения</h3>
                                <div className="performance-value">
                                    {performanceStats.timeTaken}
                                </div>
                            </div>
                        </div>
                        <div className="recommendation-section">
                            <h3>Рекомендация по скорости</h3>
                            <p className="recommendation-text">
                                {performanceStats.timeRecommendation}
                            </p>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="action-buttons"
                        variants={statsVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <button 
                            className="categories-btn" 
                            onClick={handleBackToCategories}
                        >
                            Выбрать категорию
                        </button>
                    </motion.div>
                </div>
            </div>
        </motion.div>
    );
};

export default ResultOfNGTest;