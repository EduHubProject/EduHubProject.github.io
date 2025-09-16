import React from 'react';

export const ChessboardVisualization = ({ 
  board = [], 
  move = null 
}) => {
  // Если доска не передана, возвращаем заглушку
  if (!board || board.length === 0) {
    return <div>Доска не инициализирована</div>;
  }

  return (
    <div className="chessboard-visualization">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="chessboard-row">
          {row.map((piece, colIndex) => {
            const isLight = (rowIndex + colIndex) % 2 === 0;
            const isFromSquare = move && 
              move?.from?.row === rowIndex && 
              move?.from?.col === colIndex;
            
            const isToSquare = move && 
              move?.to?.row === rowIndex && 
              move?.to?.col === colIndex;
  
            return (
              <div 
                key={colIndex} 
                className={`
                  chessboard-cell 
                  ${isLight ? 'light-cell' : 'dark-cell'}
                  ${isFromSquare ? 'from-square' : ''}
                  ${isToSquare ? 'to-square' : ''}
                `}
              >
                <div 
                  className="piece" 
                  style={{
                    color: piece && (piece === piece.toUpperCase() ? 'white' : 'black')
                  }}
                >
                  {piece}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};