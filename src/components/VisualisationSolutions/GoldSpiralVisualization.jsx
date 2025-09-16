import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const SolutionGraph = ({ 
  currentStep, 
  width = 1200, 
  height = 800 
}) => {
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const canvasRef = useRef(null);
  const [formulas, setFormulas] = useState([]);

  const goldenSpiralFormulas = [
    {
      title: "Число золотого сечения",
      formula: "φ = (1 + √5) / 2",
      description: "Фундаментальная константа"
    },
    {
      title: "Радиус спирали",
      formula: "r = a * exp(θ / (2π/ln(φ)))",
      description: "Экспоненциальный рост"
    },
    {
      title: "Координаты",
      formula: "x = r * cos(θ)\ny = r * sin(θ)", 
      description: "Преобразование координат"
    },
    {
      title: "Цвет",
      formula: "color = hsl(θ * k, 70%, 50%)",
      description: "Динамика цвета"
    }
  ];

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      setDeviceWidth(newWidth);
      setIsMobile(newWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);

    const phi = (1 + Math.sqrt(5)) / 2;

    ctx.save();
    ctx.translate(width/2, height/2);
    ctx.scale(isMobile ? 1 : 3, isMobile ? 1 : 3);

    ctx.beginPath();
    ctx.moveTo(0, 0);

    let a = 0;
    let r = 0;

    for (let angle = 0; angle < currentStep * Math.PI * 2; angle += 0.1) {
      r = a * Math.exp(angle / (Math.PI * 2 / Math.log(phi)));
      
      const x = r * Math.cos(angle);
      const y = r * Math.sin(angle);

      ctx.strokeStyle = `hsl(${angle * 20}, 70%, 50%)`;
      ctx.lineWidth = 1;
      ctx.lineTo(x, y);
      ctx.stroke();

      a += 0.05;
    }

    ctx.restore();

    // Обновляем формулы по шагам
    setFormulas(goldenSpiralFormulas.slice(0, currentStep + 1));

  }, [currentStep, width, height, isMobile, deviceWidth]);

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: isMobile ? 'column' : 'row',
      justifyContent: 'center', 
      alignItems: 'center',
      width: '100%', 
      height: '100%', 
      background: 'linear-gradient(45deg, #1a1a2e, #16213e)',
      color: 'white',
      padding: '20px',
      borderRadius: '15px'
    }}>
      <div style={{ 
        width: '100%',
        maxWidth: isMobile ? deviceWidth - 40 : 600,
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        margin: '0 auto'
      }}>
        <canvas 
          ref={canvasRef}
          width={isMobile ? deviceWidth - 40 : width}
          height={isMobile ? deviceWidth - 40 : height}
          style={{ 
            maxWidth: '100%',
            maxHeight: '100%'
          }}
        />
      </div>
      
      <div style={{ 
        width: isMobile ? '100%' : '400px',
        padding: isMobile ? '10px' : '0 20px',
        marginTop: isMobile ? '20px' : 0,
        maxHeight: '600px',
        overflowY: 'auto'
      }}>
        <h2 style={{fontSize: isMobile ? '18px' : '24px'}}>
          Математика золотой спирали
        </h2>
        {formulas.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.2 }}
            style={{
              background: 'rgba(255,255,255,0.1)',
              padding: isMobile ? '10px' : '15px',
              margin: '10px 0',
              borderRadius: '10px'
            }}
          >
            <h3 style={{fontSize: isMobile ? '16px' : '20px'}}>
              {item.title}
            </h3>
            <pre style={{ 
              whiteSpace: 'pre-wrap', 
              fontFamily: 'monospace',
              fontSize: isMobile ? '12px' : '16px',
              margin: '10px 0',
              overflowX: 'auto'
            }}>
              {item.formula}
            </pre>
            <p style={{ 
              color: 'rgba(255,255,255,0.7)',
              fontSize: isMobile ? '10px' : '14px'
            }}>
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SolutionGraph;