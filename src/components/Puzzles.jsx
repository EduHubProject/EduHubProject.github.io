import React, { useState, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import '../styles/puzzles.css';
import puzzleImage1 from '../assets/puzzles/1.webp';
import puzzleImage2 from '../assets/puzzles/2.webp';
import puzzleImage3 from '../assets/puzzles/3.webp';
import puzzleImage4 from '../assets/puzzles/4.webp';
import puzzleImage5 from '../assets/puzzles/5.webp';
import Modal from './Modal'; 
import { Helmet } from 'react-helmet';

const Puzzles = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPuzzleType, setSelectedPuzzleType] = useState(null);
  const puzzleTypes = useMemo(() => [
    { id: 1, name: `${t('critMind')}`, backgroundImage: puzzleImage1, type: 'critical' },
    { id: 2, name: `${t('artMind')}`, backgroundImage: puzzleImage2, type: 'creative' },
    { id: 3, name: `${t('logicMind')}`, backgroundImage: puzzleImage3, type: 'logic' },
    { id: 4, name: `${t('objectMind')}`, backgroundImage: puzzleImage4, type: 'spatial' },
    { id: 5, name: `${t('intuitionMind')}`, backgroundImage: puzzleImage5, type: 'intuitive' },
  ], [t]);
  const handlePuzzleTypeClick = (type) => {
    setSelectedPuzzleType(type);
    setIsModalOpen(true); 
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectDifficulty = (difficulty) => {
    navigate(`/test/${selectedPuzzleType.type}?difficulty=${difficulty}`); 
    setIsModalOpen(false); 
  };

  return (
    <div className="puzzles-section">
      <Helmet>
        <title>{t('puzzlesTitle')}</title>
      </Helmet>
      <h1 className="puzzles-section__title">{t('puzzleType')}</h1>
      <div className="puzzles-section__grid">
        {puzzleTypes.map((type) => (
          <div 
            key={type.id} 
            className="puzzles-section__card" 
            onClick={() => handlePuzzleTypeClick(type)}
            style={{
              backgroundImage: `url(${type.backgroundImage})`,
              backgroundSize: 'cover', 
              backgroundPosition: 'center', 
              position: 'relative', 
              color: 'white', 
              padding: '15px', 
              borderRadius: '8px', 
              overflow: 'hidden',
              backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            }}
          >
            <h2 className="puzzles-section__card-name">{type.name}</h2>
          </div>
        ))}
      </div>
      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        onSelectDifficulty={handleSelectDifficulty} 
      />
    </div>
  );
};

export default React.memo(Puzzles);