import React from 'react';
import './Sidebar.css'; 
import { useTranslation } from 'react-i18next'; 

const Sidebar = ({ questions, userAnswers, onQuestionSelect }) => {
      const { t } = useTranslation();
  return (
    <div className="sidebar">
      <h3>{t('questions')}</h3>
      <div className="question-list">
        {questions && questions.length > 0 ? (
          questions.map((_, index) => { 
            const answered = userAnswers[index] && userAnswers[index].selected !== undefined;
            return (
              <div
                key={index}
                className={`question-item ${answered ? 'answered' : 'not-answered'}`}
                onClick={() => onQuestionSelect(index)}
              >
                {index + 1}
              </div>
            );
          })
        ) : (
        <div>{t('haveNotQuestions')}</div>
        )}
      </div>
    </div>
  );
};

export default Sidebar;