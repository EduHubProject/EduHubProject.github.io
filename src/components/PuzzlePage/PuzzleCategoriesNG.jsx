import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import confetti from 'canvas-confetti';
import styles from './PuzzleCategoriesNG.module.css';
import { getPuzzleCategories, CHARACTERS, LEVEL_THRESHOLDS } from './PuzzleConstantsNG';

const CategoryCard = React.memo(({ category, onSelect }) => (
    <motion.div 
        className={styles['puzzle-categories-engine__category-card']}
        onClick={onSelect}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
            opacity: category.finished ? 0.5 : 1,
            pointerEvents: category.finished ? 'none' : 'auto'
        }}
    >
        <span className={styles['puzzle-categories-engine__category-icon']}>
            {category.icon}
        </span>
        <h3 className={styles['puzzle-categories-engine__category-name']}>
            {category.name}
        </h3>
        {category.finished && (
            <div className={styles['puzzle-categories-engine__category-completed']}>
                Пройдено ✅
            </div>
        )}
    </motion.div>
));

export const PuzzleCategoriesNG = () => {
    const [playerLevel, setPlayerLevel] = useState(0);
    const [totalScore, setTotalScore] = useState(0);
    const [categories, setCategories] = useState(getPuzzleCategories());
    const navigate = useNavigate();

    useEffect(() => {
        const savedScore = localStorage.getItem('totalScore');
        const savedCategories = localStorage.getItem('PUZZLE_CATEGORIES');

        if (savedCategories) {
            setCategories(JSON.parse(savedCategories));
        }

        const score = savedScore ? parseInt(savedScore, 10) : 0;
        setTotalScore(score);
        setPlayerLevel(calculatePlayerLevel(score));
    }, []);

    useEffect(() => {
        const newPlayerLevel = calculatePlayerLevel(totalScore);
        setPlayerLevel(newPlayerLevel);
        localStorage.setItem('playerLevel', newPlayerLevel.toString());
    }, [totalScore]);

    const calculatePlayerLevel = (score) => {
        if (score < LEVEL_THRESHOLDS[1]) return 0;
        if (score < LEVEL_THRESHOLDS[2]) return 1;
        if (score < LEVEL_THRESHOLDS[3]) return 2;
        return 3;
    };

    const playConfetti = useCallback(() => {
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, []);

    const handleCategorySelect = useCallback((category) => {
        navigate(`/puzzle-test/${category.id}`, { state: { category, playerLevel } });
    }, [navigate, playerLevel]);

    const getCurrentLevelDetails = useMemo(() => ({
        avatar: CHARACTERS.math_hero.avatars[playerLevel],
        name: CHARACTERS.math_hero.levelNames[playerLevel],
        description: CHARACTERS.math_hero.levelDescriptions[playerLevel]
    }), [playerLevel]);

    return (
        <div className={styles['puzzle-categories-engine']}>
            <ToastContainer 
                className={styles['puzzle-categories-engine__toast-container']}
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />

            <motion.div 
                className={styles['puzzle-categories-engine__game-container']}
                initial={{ opacity: 0.8, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <div className={styles['puzzle-categories-engine__category-selection']}>
                    <div className={styles['puzzle-categories-engine__character-intro']}>
                        <div 
                            className={styles['puzzle-categories-engine__character-avatar']}
                            onClick={playConfetti}
                        >
                            {getCurrentLevelDetails.avatar}
                        </div>

                        <h2 className={styles['puzzle-categories-engine__character-name']}>
                            {CHARACTERS.math_hero.name}
                        </h2>

                        <p className={styles['puzzle-categories-engine__character-description']}>
                            {getCurrentLevelDetails.description}
                        </p>

                        <div className={styles['puzzle-categories-engine__player-stats']}>
                            <span className={styles['puzzle-categories-engine__player-level']}>
                                Уровень: {getCurrentLevelDetails.name} &nbsp; &nbsp;
                            </span>
                            <span className={styles['puzzle-categories-engine__player-score']}>
                                Очки: {totalScore}
                            </span>
                        </div>
                    </div>

                    <div className={styles['puzzle-categories-engine__categories-grid']}>
                        {categories.map(category => (
                            <CategoryCard 
                                key={category.id}
                                category={category}
                                onSelect={() => handleCategorySelect(category)}
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default PuzzleCategoriesNG;