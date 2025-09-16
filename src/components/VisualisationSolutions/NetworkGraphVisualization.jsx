import React from 'react';
import { motion } from 'framer-motion';

export const NetworkGraphVisualization = ({ currentStepData }) => {
  const { nodes = [], connections = [] } = currentStepData;

  const calculateNodePositions = (nodesCount) => {
    const positions = [
      { x: 200, y: 250 }  // Первый узел слева
    ];

    // Боковые ответвления
    if (nodesCount > 1) {
      positions.push(
        { x: 400, y: 100 },   // Верхнее ответвление
        { x: 400, y: 400 }    // Нижнее ответвление
      );
    }

    // Следующий уровень
    if (nodesCount > 3) {
      positions.push(
        { x: 600, y: 250 }    // Центральный узел следующего уровня
      );
    }

    // Последующие узлы
    for (let i = 4; i < nodesCount; i++) {
      positions.push({
        x: 800 + (i - 4) * 200, 
        y: 250
      });
    }

    return positions;
  };

  const nodePositions = calculateNodePositions(nodes.length);

  const generateConnections = () => {
    const generatedConnections = [];
  
    // Если меньше 2 узлов - никаких связей
    if (nodes.length < 2) return generatedConnections;
  
    // НА ВТОРОМ ШАГУ - СВЯЗЬ ОТ ПЕРВОГО УЗЛА КО ВТОРОМУ
    if (nodes.length === 2) {
      generatedConnections.push(
        { from: nodes[0].id, to: nodes[1].id }
      );
    }
  
    // Связь первого узла с боковыми
    if (nodes.length >= 3) {
      generatedConnections.push(
        { from: nodes[0].id, to: nodes[1].id },
        { from: nodes[0].id, to: nodes[2].id }
      );
    }
  
    // Связь боковых с центральным узлом следующего уровня
    if (nodes.length >= 4) {
      generatedConnections.push(
        { from: nodes[1].id, to: nodes[3].id },
        { from: nodes[2].id, to: nodes[3].id }
      );
    }
  
    // Связи для последующих уровней ТОЛЬКО от 4-го узла
    for (let i = 4; i < nodes.length; i++) {
      generatedConnections.push(
        { from: nodes[3].id, to: nodes[i].id }
      );
    }
  
    return generatedConnections;
  };

  const renderConnections = () => {
    const connectionsToRender = generateConnections();

    return connectionsToRender.map((conn, index) => {
      const fromNode = nodes.find(n => n.id === conn.from);
      const toNode = nodes.find(n => n.id === conn.to);
      
      const fromPos = nodePositions[nodes.indexOf(fromNode)];
      const toPos = nodePositions[nodes.indexOf(toNode)];

      return (
        <motion.line
          key={`connection-${index}`}
          x1={fromPos.x}
          y1={fromPos.y}
          x2={toPos.x}
          y2={toPos.y}
          stroke="#4ecdc4"
          strokeWidth={4}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
        />
      );
    });
  };

  const renderNodes = () => {
    return nodes.map((node, index) => {
      const pos = nodePositions[index];

      return (
        <motion.g 
          key={node.id}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.2 }}
        >
          <circle
            cx={pos.x}
            cy={pos.y}
            r={90}
            fill="#2c3e50"
            stroke="#4ecdc4"
            strokeWidth={3}
          />
          <text
            x={pos.x}
            y={pos.y - 20}
            textAnchor="middle"
            fontSize="24"
            fill="white"
          >
            {node.title}
          </text>
          <text
            x={pos.x}
            y={pos.y + 10}
            textAnchor="middle"
            fontSize="18"
            fill="#4ecdc4"
          >
            {node.duration} дней
          </text>
        </motion.g>
      );
    });
  };

  return (
    <div style={{ 
      width: '100%', 
      height: '500px', 
      overflowX: 'hidden', 
      overflowY: 'hidden' 
    }}>
      <svg 
        width="100%" 
        height="500" 
        viewBox="0 0 1200 500"
      >
        {renderConnections()}
        {renderNodes()}
      </svg>
    </div>
  );
};