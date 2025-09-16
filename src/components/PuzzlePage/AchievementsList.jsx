import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementModal } from './AchievementModal';

export const AchievementsList = ({ achievements, onShowAllToggle }) => {
    const [showAllAchievements, setShowAllAchievements] = useState(false);
    const [selectedAchievement, setSelectedAchievement] = useState(null);

    const displayedAchievements = showAllAchievements 
        ? achievements 
        : achievements.slice(0, 4);

    const toggleShowAll = () => {
        setShowAllAchievements(!showAllAchievements);
        onShowAllToggle();
    };

    return (
        <div className="achievements-section">
            <h3>
                Мои достижения ({achievements.length})
            </h3>
            <div className="achievements-grid">
                {displayedAchievements.map(achievement => (
                    <motion.div 
                        key={achievement.id}
                        className="achievement-badge"
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        onClick={() => setSelectedAchievement(achievement)}
                    >
                        {achievement.icon} {achievement.name}
                    </motion.div>
                ))}
                {achievements.length > 4 && !showAllAchievements && (
                    <button 
                        onClick={toggleShowAll}
                        className="show-more-achievements"
                    >
                        Ещё... (+{achievements.length - 4})
                    </button>
                )}
            </div>

            <AnimatePresence>
                {selectedAchievement && (
                    <AchievementModal 
                        achievement={selectedAchievement}
                        onClose={() => setSelectedAchievement(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};