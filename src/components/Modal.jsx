import React from 'react';
import { useTranslation } from 'react-i18next'; 
import '../styles/modal.css';

const Modal = ({ isOpen, onClose, onSelectDifficulty }) => {
    const { t } = useTranslation(); 

    if (!isOpen) return null;

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-section" onClick={handleOverlayClick}>
            <div className="modal-section__content">
                <button className="modal-section__close-button" onClick={onClose}>✖</button>
                <h2 className="modal-section__title">{t('selectDifficulty')}</h2>
                <button 
                    className="modal-section__button modal-section__button_type_easy" 
                    onClick={() => onSelectDifficulty('Лёгкий')}
                >
                    {t('easy')}
                </button>
                <button 
                    className="modal-section__button modal-section__button_type_medium" 
                    onClick={() => onSelectDifficulty('Средний')}
                >
                    {t('medium')}
                </button>
                <button 
                    className="modal-section__button modal-section__button_type_hard" 
                    onClick={() => onSelectDifficulty('Сложный')}
                >
                    {t('hard')}
                </button>
                <button 
                    className="modal-section__button modal-section__button_type_expert" 
                    onClick={() => onSelectDifficulty('Эксперт')}
                >
                    {t('expert')}
                </button>
            </div>
        </div>
    );
};

export default Modal;