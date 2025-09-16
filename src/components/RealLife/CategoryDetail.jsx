// src/components/CategoryDetail.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { categoryData } from './Categories';
import styles from './CategoryDetail.module.css';


const CategoryDetail = () => {
  const { categoryId } = useParams();
  const category = categoryData.find(cat => cat.id === categoryId);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const navigate = useNavigate();

  if (!category) return null;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300 
      }
    }
  };
  const handleBackToCategories = () => {
    navigate('/rlpuzzles'); // Путь к списку категорий
  };
  const handleStartSolving = (categoryId, exampleId) => {
    navigate(`/rlpuzzles/${categoryId}/test?puzzle=${exampleId}`);
  };
  return (
    <div className={styles.categoryDetailContainer}>
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={styles.categoryHeader}
      >
        <div className={styles.categoryIcon}>{category.icon}</div>
        <h1 className={styles.categoryTitle}>{category.title}</h1>
      </motion.div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={styles.puzzleGrid}
      >
        {category.examples.map((puzzle) => (
          <motion.div 
            key={puzzle.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={styles.puzzleCard}
            onClick={() => setSelectedPuzzle(puzzle)}
          >
            <div className={styles.puzzleCardContent}>
              <h3 className={styles.puzzleTitle}>{puzzle.text}</h3>
              <div className={styles.puzzleCardOverlay}>
                <span>Исследовать</span>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
      <motion.button 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className={styles.backToCategoriesButton}
        onClick={handleBackToCategories}
      >
        ← Категории
      </motion.button>
      <AnimatePresence>
  {selectedPuzzle && (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={styles.puzzleModalBackdrop}
      onClick={() => setSelectedPuzzle(null)}
    >
      <motion.div 
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className={styles.puzzleModal}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.puzzleModalTitle}>
            {selectedPuzzle.text}
        </h2>
        <div className={styles.puzzleModalDescription}>
        {selectedPuzzle.description.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
        ))}
        </div>
        <div className={styles.puzzleModalActions}>
        <button 
        className={styles.puzzleModalStartButton}
        onClick={() => handleStartSolving(category.id, selectedPuzzle.id)}
      >
        <span className={styles.puzzleModalStartButtonIcon}>🧩</span>
        Начать решение
      </button>
          <button className={styles.puzzleModalCloseButton} onClick={() => setSelectedPuzzle(null)}>Закрыть</button>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>
    </div>
  );
};

export default CategoryDetail;