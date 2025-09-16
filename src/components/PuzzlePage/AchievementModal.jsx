import React from 'react';
import { motion } from 'framer-motion';

export const AchievementModal = ({ achievement, onClose }) => (
    <motion.div 
        className="achievement-modal"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.5 }}
    >
        <div className="achievement-modal-content">
            <span className="achievement-icon">{achievement.icon}</span>
            <h2>{achievement.name}</h2>
            <p>{achievement.description}</p>
            <button onClick={onClose}>Круто!</button>
        </div>
    </motion.div>
);