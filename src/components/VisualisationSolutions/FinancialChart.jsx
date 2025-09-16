// components/VisualisationSolutions/FinancialChart.jsx
import React, { useRef, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
Chart.register(...registerables, annotationPlugin);

export const FinancialChart = ({ data }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      chart.data.datasets[0].data = data.values;
      chart.update();
    }
  }, [data]);

  const chartData = {
    labels: data.labels,
    datasets: [{
      label: 'Финансовые показатели (млн ₸)', // Изменено на ₸
      data: data.values,
      borderColor: '#4ecdc4',
      backgroundColor: 'rgba(78, 205, 196, 0.2)',
      tension: 0.4,
      pointRadius: 5,
      pointHoverRadius: 7
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false, // Отключаем авто-пропорции
    plugins: {
      annotation: {
        annotations: data.annotations || {}
      },
      legend: { position: 'bottom' },
      tooltip: {
        callbacks: {
          label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} млн ₸` // Изменено на ₸
        }
      }
    },
    scales: {
      y: {
        title: { display: true, text: 'Млн тенге' }, // Изменено на тенге
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        }
      },
      x: {
        grid: {
          color: 'rgba(255, 255, 255, 0.1)',
        },
        ticks: {
          color: 'white',
        }
      }
    }
  };

  return (
    <div className="financial-chart-container">
      <div className="chart-header">
        <h3 className="chart-title">{data.title}</h3>
        <div className="chart-legend">
          <span className="legend-item">
            <div className="color-box" style={{ backgroundColor: '#4ecdc4' }}></div>
            Фактические показатели
          </span>
        </div>
      </div>
      <div style={{ position: 'relative', height: '300px', width: '100%' }}>
        <Line 
          ref={chartRef}
          data={chartData} 
          options={options}
        />
      </div>
    </div>
  );
};