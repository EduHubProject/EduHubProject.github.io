import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  FaChessKnight, 
  FaArrowRight,
  FaLightbulb,
  FaArrowLeft,
  FaHome,
  FaStepForward,
  FaStepBackward
} from 'react-icons/fa';
import { solutionData } from './SolutionData';
import { ChessboardVisualization } from './ChessboardVisualization';
import { SolutionGraph } from './GoldSpiralVisualization';
import { NetworkGraphVisualization } from './NetworkGraphVisualization';
import { FinancialChart } from './FinancialChart';
import './SolutionVisualization.css';

const SolutionVisualization = () => {
  const navigate = useNavigate();
  const { solutionType, puzzleId } = useParams();
  const [currentStep, setCurrentStep] = useState(0);

  const solution = solutionData[`${solutionType}-${puzzleId}`];

  if (!solution) {
    return <div>Визуализация не найдена</div>;
  }

  const currentStepData = solution.steps[currentStep];

  const handleNextStep = () => {
    if (currentStep < solution.steps.length - 1) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="solution-visualization">
      <div className="solution-visualization__content">
        <div className="solution-visualization__header">
          <div className="solution-visualization__navigation">
            <div className="navigation-buttons">
              <button 
                onClick={handleGoBack} 
                className="navigation-button"
                title="Назад"
              >
                <FaArrowLeft />
              </button>
            </div>
            
            <div className="header-title">
              <h1>{solution.title}</h1>
              <p>{solution.description}</p>
            </div>
            
            <div className="step-navigation">
              {solution.steps.map((_, index) => (
                <button
                  key={index}
                  className={`step-dot ${index === currentStep ? 'active' : ''}`}
                  onClick={() => setCurrentStep(index)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="solution-visualization__step"
          >
            <div className="step-header">
              <h2>
                <FaChessKnight className="step-icon" />
                Шаг {currentStep + 1}: {currentStepData.description}
              </h2>
            </div>
  
            <div className="solution-visualization__main-content">
              <div className="solution-visualization__illustration">
                {solutionType === 'logic' && puzzleId === 'math-reasoning' ? (
                  <SolutionGraph
                    width={600}
                    height={400}
                    currentStep={currentStep}
                  />
                ) : solutionType === 'logic' && puzzleId === 'chess-logic' && currentStepData.initialBoard ? (
                  <ChessboardVisualization 
                    board={currentStepData.initialBoard} 
                    move={currentStepData.move}
                    previousBoard={
                      currentStep > 0 
                        ? solution.steps[currentStep - 1].initialBoard 
                        : null
                    }
                  />
                ) : solutionType === 'practical' && puzzleId === 'project-management' ? (
                  <NetworkGraphVisualization 
                    currentStepData={currentStepData}
                    currentStep={currentStep}
                  />
                ) : solutionType === 'practical' && puzzleId === 'financial-analysis' ? (
                  <FinancialChart data={currentStepData.financialData} />
                ) : (
                  <div>Визуализация не найдена</div>
                )}
              </div>
  
              <div className="solution-visualization__insights">
                <h3 className="insights-title">   
                  <FaLightbulb className="insights-icon" /> 
                  Ключевые наблюдения
                </h3>
                <div className="insights-container">
                  {currentStepData.insights.map((insight, index) => (
                    <motion.div 
                      key={index} 
                      className="insight-card"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ 
                        delay: index * 0.1,
                        duration: 0.3
                      }}
                    >
                      <div className="insight-number">{index + 1}</div>
                      <div className="insight-text">{insight}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
  
        <div className="solution-visualization__controls">
          <button 
            onClick={handlePrevStep} 
            disabled={currentStep === 0}
            className="control-button prev"
          >
            <FaStepBackward /> Предыдущий шаг
          </button>
          <button 
            onClick={handleNextStep} 
            disabled={currentStep === solution.steps.length - 1}
            className="control-button next"
          >
            Следующий шаг <FaStepForward />
          </button>
        </div>
      </div>
    </div>
  );
};

export default SolutionVisualization;