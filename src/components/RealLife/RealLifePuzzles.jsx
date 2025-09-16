// src/RealLifePuzzles.jsx
import React from 'react';
import './RealLifePuzzles.css'; 
import Categories from './Categories';

const RealLifePuzzles = () => {
  return (
    <div className="real-life-puzzles">
      <h1 className="real-life-puzzles__title">Головоломки в реальной жизни</h1>
      <Categories />
    </div>
  );
};

export default RealLifePuzzles;