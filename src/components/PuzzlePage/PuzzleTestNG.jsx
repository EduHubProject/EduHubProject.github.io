import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import confetti from 'canvas-confetti';
import 'react-toastify/dist/ReactToastify.css'; 

import { 
    CHARACTERS, 
    DIFFICULTY_LEVELS, 
    ACHIEVEMENTS,
    PUZZLE_CATEGORIES,
    LEVEL_THRESHOLDS
} from './PuzzleConstantsNG';

import correctSound from '../../assets/sounds/correct.mp3';
import wrongSound from '../../assets/sounds/wrong.mp3';
import levelUpSound from '../../assets/sounds/levelup.mp3';

import './PuzzleTestNG.css';

export const PuzzleTestNG = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [feedback, setFeedback] = useState(null);
    const [hintVisible, setHintVisible] = useState(false);
    const [hintMessage, setHintMessage] = useState('');

    const { 
        category = PUZZLE_CATEGORIES[0], 
        playerLevel: initialPlayerLevel = 0, 
        totalScore: initialTotalScore = 0,
        puzzlesToUse: initialPuzzles = category.puzzles
    } = location.state || {};

    const [gameState, setGameState] = useState({
        playerLevel: initialPlayerLevel,
        totalScore: initialTotalScore,
        currentPuzzle: initialPuzzles[0],
        currentPuzzleIndex: 0,
        userAnswer: '',
        feedback: null,
        hintsUsed: 0,
        randomizedPuzzles: initialPuzzles,
        completedPuzzles: [],
        startTime: Date.now(),
        totalPuzzles: initialPuzzles.length, 
        solvedPuzzles: 0  
    });

    const correctAudioRef = useRef(new Audio(correctSound));
    const wrongAudioRef = useRef(new Audio(wrongSound));
    const levelUpAudioRef = useRef(new Audio(levelUpSound));

    const showFeedback = useCallback((message, type) => {
        setFeedback({ message, type });
        
        const timer = setTimeout(() => {
            setFeedback(null);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const checkLevelUp = (totalScore) => {
        for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
            if (totalScore >= LEVEL_THRESHOLDS[i]) {
                return i;
            }
        }
        return 0;
    };

    const endGame = useCallback(() => {
        navigate('/puzzle-result', {
            state: {
                score: gameState.totalScore,
                totalPuzzles: initialPuzzles.length,
                solvedPuzzles: gameState.completedPuzzles.map(id => 
                    initialPuzzles.find(puzzle => puzzle.id === id)
                ),
                timeTaken: Date.now() - gameState.startTime,
                category: category,
                playerLevel: gameState.playerLevel
            }
        });
    }, [
        navigate, 
        gameState.totalScore, 
        initialPuzzles, 
        gameState.completedPuzzles, 
        gameState.startTime, 
        category, 
        gameState.playerLevel
    ]);

    useEffect(() => {
        if (gameState.currentPuzzleIndex >= initialPuzzles.length) {
            endGame();
        }
    }, [gameState.currentPuzzleIndex, initialPuzzles.length, endGame]);

    const checkAnswer = useCallback(() => {
        const { 
            currentPuzzle, 
            userAnswer, 
            hintsUsed, 
            totalScore, 
            currentPuzzleIndex, 
            randomizedPuzzles
        } = gameState;

        if (userAnswer.trim() === currentPuzzle.answer) {
            correctAudioRef.current.play();
            confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });

            const earnedPoints = currentPuzzle.reward.points * (3 - hintsUsed);
            const newTotalScore = totalScore + earnedPoints;
            const newPlayerLevel = checkLevelUp(newTotalScore);

            if (newPlayerLevel > gameState.playerLevel) {
                levelUpAudioRef.current.play();
                toast.success(`🎉 Поздравляем! Вы достигли уровня ${CHARACTERS.math_hero.levelNames[newPlayerLevel]}!`, {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
            }

            showFeedback('✅ Правильный ответ!', 'success');

            const nextPuzzleIndex = currentPuzzleIndex + 1;

            setGameState(prev => ({
                ...prev,
                totalScore: newTotalScore,
                playerLevel: newPlayerLevel,
                completedPuzzles: [...prev.completedPuzzles, currentPuzzle.id],
                currentPuzzleIndex: nextPuzzleIndex,
                currentPuzzle: nextPuzzleIndex < randomizedPuzzles.length 
                    ? randomizedPuzzles[nextPuzzleIndex] 
                    : null,
                userAnswer: '',
                solvedPuzzles: prev.solvedPuzzles + 1
            }));
        } else {
            wrongAudioRef.current.play();
            showFeedback('❌ Попробуй еще раз!', 'error');
            setGameState(prev => ({
                ...prev,
                userAnswer: '',
            }));
        }
    }, [gameState, showFeedback]);

    const showHint = useCallback((message) => {
        setHintMessage(message);
        setHintVisible(true);
    }, []);
    
    const closeHint = useCallback(() => {
        setHintVisible(false);
    }, []);

    const getHint = useCallback(() => {
        const MAX_HINTS = 3;
    
        if (gameState.hintsUsed < MAX_HINTS && gameState.currentPuzzle?.explanation) {
            showHint(`💡 Подсказка (${gameState.hintsUsed + 1}/${MAX_HINTS}): ${gameState.currentPuzzle.explanation}`);
    
            setGameState(prev => ({
                ...prev,
                hintsUsed: prev.hintsUsed + 1
            }));
        } else if (gameState.hintsUsed >= MAX_HINTS) {
            showFeedback('Вы исчерпали все подсказки', 'error');
        }
    }, [gameState.currentPuzzle, gameState.hintsUsed, showHint]);

    const handleBack = () => navigate('/puzzle-categories');

    return (
        <div className="puzzle-engine">
            <div className="game-container">
                <div className="sidebar">
                    <button 
                        className="back-button" 
                        onClick={handleBack}
                    >
                        ← Назад
                    </button>
                    <div className="sidebar-stats">
                        <div className="sidebar-stat">
                            <h4>Уровень</h4>
                            <span>
                                {CHARACTERS.math_hero.levelNames[gameState.playerLevel] || `${gameState.playerLevel + 1}`}
                            </span>
                        </div>
                        <div className="sidebar-stat">
                            <h4>Очки</h4>
                            <span>{gameState.totalScore}</span>
                        </div>
                        <div className="sidebar-stat">
                            <h4>Решено</h4>
                            <span>{`${gameState.solvedPuzzles} из ${gameState.totalPuzzles}`}</span>
                        </div>
                    </div>
                </div>
    
                <div className="puzzle-card">
                    <h1 className="puzzle-title-question">{gameState.currentPuzzle?.question}</h1>
                    {gameState.currentPuzzle?.format && (
                        <div className="puzzle-format" style={{ 
                            marginBottom: '10px',
                            padding: '8px',
                            backgroundColor: 'rgba(255, 255, 255, 0.15)', 
                            color: '#e0e0e0', 
                            borderRadius: '4px',
                            fontSize: '14px', 
                            fontStyle: 'normal', 
                        }}>
                            <strong>Формат ответа:</strong> {gameState.currentPuzzle.format}
                        </div>
                    )}
                    <input 
                        type="text" 
                        value={gameState.userAnswer} 
                        onChange={(e) => setGameState(prev => ({ ...prev, userAnswer: e.target.value }))}
                        placeholder="Ваш ответ"
                    />
                    <div className="puzzle-actions">
                        <button 
                            className="hint-button" 
                            onClick={getHint}
                            disabled={gameState.hintsUsed >= 3}
                        >
                            💡 Подсказка ({3 - gameState.hintsUsed})
                        </button>
                        <button 
                            className="check-button" 
                            onClick={checkAnswer}
                        >
                            ✅ Проверить
                        </button>
                    </div>
                    <AnimatePresence>
                        {feedback && (
                            <motion.div 
                                className={`feedback ${feedback.type}`}
                                initial={{ opacity: 0, y: 50 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ 
                                    opacity: 0, 
                                    y: 50,
                                    transition: { 
                                        duration: 0.3,
                                        ease: "easeInOut"
                                    } 
                                }}
                            >
                                {feedback.message}
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {hintVisible && (
                            <motion.div 
                                className="puzzle-hint"
                                initial={{ opacity: 0, y: 20 }} 
                                animate={{ opacity: 1, y: 0 }} 
                                exit={{ 
                                    opacity: 0, 
                                    y: 20, 
                                    transition: { duration: 0.2 }
                                }}
                            >
                                <button onClick={closeHint} className="puzzle-hint__close-button">
                                    ✖
                                </button>
                                <div className="puzzle-hint__content">
                                    <span>{hintMessage}</span>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default PuzzleTestNG;