import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Chart } from 'react-google-charts';
import './Survey.css'; 
import { faAngleUp } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from 'react-i18next';

const MemoizedChart = React.memo(Chart);

const Survey = () => {
    const { t } = useTranslation();
    const sheetId = "1jM6TZuIp7ObFF-d_V_lcHvxjlupSs7v75DJSTDsbhyw"; 
    const apiKey = "AIzaSyCWa-6-BACiuc0sPEAGmuUYbDvBOAia3DM"; 

    const [responses, setResponses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isTableVisible, setIsTableVisible] = useState(true); 
    const [surveyTitle, setSurveyTitle] = useState('');
    const [currentIndex, setCurrentIndex] = useState(0);
    const [chartData, setChartData] = useState([]);
    const [startX, setStartX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);

    const fetchSurveyTitle = useCallback(async () => {
        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}?key=${apiKey}`;
        try {
            const response = await fetch(sheetUrl);
            if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
            const data = await response.json();
            setSurveyTitle(data.properties.title); 
        } catch (error) { 
            console.error("Ошибка при получении названия таблицы:", error);
        }
    }, [sheetId, apiKey]);

    const fetchResponses = useCallback(async () => {
        const sheetUrl = `https://sheets.googleapis.com/v4/spreadsheets/${ sheetId}/values/Ответы на форму?key=${apiKey}`;
        try {
            const response = await fetch(sheetUrl);
            if (!response.ok) throw new Error(`Ошибка: ${response.status}`);
            const data = await response.json();
            setResponses(data.values);
            setLoading(false);
        } catch (error) { 
            console.error("Ошибка при получении данных:", error);
            setLoading(false);
        }
    }, [sheetId, apiKey]);

    useEffect(() => {
        const loadData = async () => {
            await Promise.all([fetchSurveyTitle(), fetchResponses()]);
        };
        loadData();
    }, [fetchSurveyTitle, fetchResponses]);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const calculateMetrics = useMemo(() => {
        if (responses.length < 2) {
            return {
                totalResponses: 0,
                totalAnswers: 0,
                lastResponseDate: 'Нет данных',
                averageAge: "Нет данных",
                neuralNetworkUsersCount: 0,
            };
        }

        const totalResponses = responses.length - 1; 
        let totalAnswers = 0;

        for (let i = 1; i < responses.length; i++) {
            const filledCells = responses[i].slice(1).filter(cell => cell).length; 
            totalAnswers += filledCells;
        }

        const lastResponseDate = responses[responses.length - 1][0] || 'Нет данных'; 
        const ageCounts = {};
        
        for (let i = 1; i < responses.length; i++) {
            const ageGroup = responses[i][1];
            ageCounts[ageGroup] = (ageCounts[ageGroup] || 0) + 1;
        }

        let totalAge = 0; 
        let totalFrequency = 0; 
        const ageMapping = {};

        for (const group in ageCounts) {
            const range = group.match(/(\d+)-(\d+)/);
            if (range) {
                const lowerBound = parseInt(range[1]);
                const upperBound = parseInt(range[2]);
                ageMapping[group] = (lowerBound + upperBound) / 2;
            } else if (group.includes('+')) {
                const lowerBound = parseInt(group);
                ageMapping[group] = (lowerBound + 70) / 2;
            } else if (group === 'до 12 лет') {
                ageMapping[group] = 6;
            } else {
                ageMapping[group] = 0;
            }
        }

        for (const [group, count] of Object.entries(ageCounts)) {
            if (count > 0) {
                const ageValue = ageMapping[group] * count;
                totalAge += ageValue;
                totalFrequency += count;
            }
        }

        const averageAge = totalFrequency > 0 ? (totalAge / totalFrequency).toFixed(2) : 'Нет данных';
        const roundedAverageAge = totalFrequency > 0 ? Math.round(totalAge / totalFrequency) : 'Нет данных';
        const neuralNetworkUsersCount = responses.slice(1).filter(response => response[6] === 'Да').length;

        return {
            totalResponses,
            totalAnswers,
            lastResponseDate,
            averageAge: `${averageAge} ≈ ${roundedAverageAge}`,
            neuralNetworkUsersCount,
        };
    }, [responses]);

    const { totalResponses, totalAnswers, lastResponseDate, averageAge, neuralNetworkUsersCount } = calculateMetrics;

    const toggleTableVisibility = useCallback(() => {
        setIsTableVisible(prev => !prev);
    }, []);

    const prepareChartData = useCallback(() => {
        if (responses.length === 0) return [];

        const data = [];
        const questionCount = responses[0].length - 2;

        for (let i = 2; i < questionCount + 2; i++) {
            const counts = {};
            responses.slice(1).forEach(response => {
                const answer = response[i];
                counts[answer] = (counts[answer] || 0) + 1;
            });

            const dataEntry = [['Ответ', 'Количество']];
            for (const [answer, count] of Object.entries(counts)) {
                dataEntry.push([answer, count]);
            }

            data.push({
                question: responses[0][i],
                data: dataEntry,
            });
        }

        return data;
    }, [responses]);

    useEffect(() => {
        const chartData = prepareChartData();
        setChartData(chartData);
    }, [prepareChartData]);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => ( prevIndex + 1) % chartData.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [chartData.length]);

    const handleNext = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % chartData.length);
    }, [chartData.length]);

    const handlePrev = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + chartData.length) % chartData.length);
    }, [chartData.length]);

    const renderCharts = useMemo(() => {
        return chartData.map((chart, index) => (
            <div 
                key={index} 
                className="chart-slide"
                style={{
                    minHeight: '400px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <MemoizedChart
                    width={'100%'}
                    height={'100%'}
                    chartType="PieChart"
                    loader={<div>Загрузка диаграмм...</div>}
                    data={chart.data}
                    options={{
                        title: chart.question,
                        titleTextStyle: {
                            color: '#00ADB5',
                            fontSize: 18,
                            bold: true
                        },
                        backgroundColor: 'transparent',
                        legend: {
                            position: 'right',
                            textStyle: {
                                color: '#eeeeee',
                                fontSize: 12
                            }
                        },
                        pieSliceText: 'percentage',
                        pieSliceTextStyle: {
                            color: '#222831',
                            fontSize: 14
                        },
                        slices: {
                            0: { color: '#00ADB5' },
                            1: { color: '#FF5733' },
                            2: { color: '#4CAF50' },
                            3: { color: '#FFC107' }
                        },
                        chartArea: {
                            width: '95%',
                            height: '65%'
                        },
                        tooltip: {
                            textStyle: {
                                color: '#222831'
                            }
                        }
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />
            </div>
        ));
    }, [chartData]);
    const handleTouchStart = (e) => {
      setStartX(e.touches[0].clientX);
      setIsDragging(true);
  };
  
  const handleTouchMove = (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const diffX = startX - currentX;
  
      if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
              handleNext(); 
          } else {
              handlePrev();
          }
          setIsDragging(false);
      }
  };
  
  const handleTouchEnd = () => {
      setIsDragging(false);
  };
  const downloadCSV = () => {
    const csvRows = [];
    
    csvRows.push(responses[0].join(','));

    for (let i = 1; i < responses.length; i++) {
        csvRows.push(responses[i].join(',')); 
    }

    const csvString = csvRows.join('\n');
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'survey_results.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
};
  const handlePassSurvey = () => {
  window.open('https://forms.gle/JTJ283AAqRuSji9g9', '_blank');
};

    return (
      <div className="survey-layout">
      <Helmet>
          <title>EduHub | {surveyTitle || t('surveyDefaultTitle')}</title>
      </Helmet>
      <div className="hero-section">
          <h1 className="hero-title">{t('surveyResultsTitle')}: {surveyTitle}</h1>
          <div className="hero-info">
              <div className="info-card">
                  {loading ? (
                      <div className="placeholder">{t('loading')}</div>
                  ) : (
                      `${t('respondentsCount')}: ${totalResponses}`
                  )}
              </div>
              <div className="info-card">
                  {loading ? (
                      <div className="placeholder">{t('loading')}</div>
                  ) : (
                      `${t('averageAge')}: ${averageAge}`
                  )}
              </div>
              <div className="info-card">
                  {loading ? (
                      <div className="placeholder">{t('loading')}</div>
                  ) : (
                      `${t('lastResponseDate')}: ${lastResponseDate}`
                  )}
              </div>
          </div>
              <button 
                  className="start-analysis" 
                  onClick={() => window.scrollTo({ top: document.getElementById('dashboard').offsetTop, behavior: 'smooth' })}
              >
                  {t('startAnalysis')}
              </button>
              <button 
                  className="pass-survey-button" 
                  onClick={handlePassSurvey}
              >
                  {t('passSurvey')}
              </button>
      </div>

      <aside className="sidebar">
          <h2>{t('navigation')}</h2>
          <ul>
              <li><a href="#dashboard">{t('generalInfo')}</a></li>
              <li><a href="#charts">{t('charts')}</a></li>
              <li><a href="#table">{t('answersTable')}</a></li>
          </ul>
          <button className="export-button" onClick={downloadCSV}>{t('downloadResults')}</button>
      </aside>

      <main id="dashboard" className="main-content">
          <h2>{t('resultsSummary')}</h2>
          <div className="metrics">
              <div className="metric-card">
                  <h3>{t('respondentsCount')}</h3>
                  <p>{totalResponses}</p>
              </div>
              <div className="metric-card">
                  <h3>{t('totalAnswersCount')}</h3>
                  <p>{totalAnswers}</p>
              </div>
              <div className="metric-card">
                  <h3>{t('neuralNetworkUsersPercent')}</h3>
                  <p>{((neuralNetworkUsersCount / totalResponses) * 100).toFixed(2)}%</p> 
              </div>
          </div>

                <section id="charts">
    <h2>{t('charts')}</h2>
    <div className="carousel-diagramm"
         onTouchStart={handleTouchStart}
         onTouchMove={handleTouchMove}
         onTouchEnd={handleTouchEnd}>
        <button className="nav-button-diagramm left" onClick={handlePrev}>&#9664;</button>
        <div className="chart-container">
            <div 
                className="chart-wrapper" 
                style={{
                    transform: `translateX(-${currentIndex * 100}%)`,
                    transition: 'transform .5s ease'
                }}
            >
                {renderCharts}
            </div>
            <div className="chart-progress">
                {chartData.map((_, index) => (
                    <span 
                        key={index} 
                        className={`progress-dash ${index === currentIndex ? 'active' : ''}`}
                    >
                        -
                    </span>
                ))}
            </div>
        </div>
        <button className="nav-button-diagramm right" onClick={handleNext}>&#9654;</button>
    </div>
</section>

                    <section id="table" className="table-section">
                    <h2 className="table-title">{t('answersTable')}</h2>
                    <button onClick={toggleTableVisibility} className="toggle-table-button">
                        <FontAwesomeIcon 
                            icon={isTableVisible ? faAngleUp : faAngleUp} 
                            className={`toggle-icon ${isTableVisible ? 'rotated' : ''}`} 
                        />
                        {isTableVisible}
                    </button>
                    {loading ? (
                        <p>{t('dataLoading')}</p>
                    ) : (
                        isTableVisible && ( 
                            <>
                                <div className="table-container">
                                    <table className="responses-table">
                                        <thead>
                                            <tr>
                                                {responses[0].slice(0, 11).map((header, index) => ( 
                                                    <th key={index}>{header}</th>
                                                ))}
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {responses.slice(1, 6).map((row, index) => (
                                                <tr key={index} className="table-row">
                                                    {row.slice(0, 11).map((cell, cellIndex) => (
                                                        <td key={cellIndex}>{cell}</td>
                                                    ))}
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                                {responses.length > 6 && ( 
                                   <div className="show-more-container"> 
                                   <a 
                                       href="https://docs.google.com/spreadsheets/d/1jM6TZuIp7ObFF-d_V_lcHvxjlupSs7v75DJSTDsbhyw/edit?usp=sharing" 
                                       target="_blank" 
                                       rel="noopener noreferrer" 
                                       className="show-more-button"
                                   >
                                       {t('moreDetails')}
                                   </a>
                               </div>
                           )}
                       </>
                   )
               )}
                    
                </section>
            </main>
        </div>
    );
};

export default React.memo(Survey);