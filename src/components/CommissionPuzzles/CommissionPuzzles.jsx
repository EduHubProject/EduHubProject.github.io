import { useState, useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import styles from './CommissionPuzzles.module.css';
import logo from '../../assets/logo.webp'; // Ваш логотип

gsap.registerPlugin(ScrollTrigger);

const PuzzlesSection = () => {
  const pageUrl = typeof window !== 'undefined' ? window.location.href : '';
  const containerRef = useRef();
  const qrRef = useRef();
  const mathRef = useRef();
  const sequenceRef = useRef();

  useGSAP(() => {
    // Параллакс для заголовка
    gsap.to('.title', {
      yPercent: -20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    // Анимация появления
    gsap.from([mathRef.current, qrRef.current, sequenceRef.current], {
      opacity: 0,
      y: 50,
      stagger: 0.3,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.grid',
        start: 'top 80%',
      },
    });
  }, { scope: containerRef });

  return (
    <section className={styles.section}>
      <div ref={containerRef} className={styles.container}>
        <h1 className={`${styles.title} title`}>
          Интерактивные задания <span>для жюри</span>
        </h1>

        <div className={styles.grid}>
          {/* Математическая загадка */}
          <div ref={mathRef} className={styles.puzzle}>
            <MathPuzzle />
          </div>

          {/* QR Code с логотипом */}
          <div ref={qrRef} className={styles.qrCard}>
            <div className={styles.qrWrapper}>
              <QRCodeSVG
                value={pageUrl}
                size={200}
                bgColor="transparent"
                fgColor="#00ADB5"
                imageSettings={{
                  src: logo,
                  height: 40,
                  width: 40,
                  excavate: true,
                }}
              />
            </div>
            <p className={styles.qrLabel}>Сканируйте для доступа</p>
          </div>

          {/* Логическая последовательность */}
          <div ref={sequenceRef} className={styles.puzzle}>
            <SequencePuzzle />
          </div>
        </div>
      </div>
    </section>
  );
};

const MathPuzzle = () => {
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const puzzleRef = useRef();
  const hintRef = useRef();

  const checkAnswer = () => {
    const correctAnswer = 25; // (5 * 5)
    if (parseInt(answer) === correctAnswer) {
      setIsSolved(true);
      setHint('');

      // Анимация успеха
      gsap.to(puzzleRef.current, {
        backgroundColor: 'rgba(72, 187, 120, 0.1)',
        borderColor: '#48BB78',
        duration: 0.5,
      });
      gsap.to('.mathFeedback', {
        text: '✅ Верно! 5 × 5 = 25',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to('.mathPuzzle', {
        scale: 0.95,
        y: -10,
        boxShadow: '0 10px 30px rgba(72, 187, 120, 0.3)',
        duration: 0.5,
      });
    } else {
      setHint('Подсказка: Найдите квадрат числа 5.');
      gsap.fromTo(hintRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
      gsap.fromTo('.mathFeedback', 
        { x: -10 }, 
        { x: 10, repeat: 3, duration: 0.1, yoyo: true, ease: 'power1.inOut' }
      );
      gsap.to('.mathFeedback', {
        text: '❌ Неверно. Попробуйте еще раз!',
        duration: 0.3,
      });
    }
  };

  return (
    <div ref={puzzleRef} className={`${styles.puzzleContent} mathPuzzle`}>
      <h3 className={styles.puzzleTitle}>
        <span>🧮</span> Математическая загадка
      </h3>
      <p className={styles.puzzleText}>
        Если 2² = 4, а 3² = 9, то чему равен квадрат числа 5?
      </p>
      <input
        type="number"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className={styles.input}
        placeholder="Введите ответ..."
        disabled={isSolved}
      />
      <div ref={hintRef} className={`${styles.feedback} mathFeedback`}>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
      <button 
        className={styles.actionButton}
        onClick={checkAnswer}
        disabled={isSolved}
        style={{ 
          background: isSolved 
            ? 'linear-gradient(135deg, #48BB78, #38A169)' 
            : 'linear-gradient(135deg, #00ADB5, #00969D)',
          cursor: isSolved ? 'not-allowed' : 'pointer'
        }}
      >
        {isSolved ? '✅ Решено!' : 'Проверить'}
      </button>
    </div>
  );
};

const SequencePuzzle = () => {
  const [answer, setAnswer] = useState('');
  const [hint, setHint] = useState('');
  const [isSolved, setIsSolved] = useState(false);
  const puzzleRef = useRef();
  const hintRef = useRef();

  const checkAnswer = () => {
    const correctAnswer = '13'; // Фибоначчи: 1, 1, 2, 3, 5, 8, 13
    if (answer === correctAnswer) {
      setIsSolved(true);
      setHint('');

      // Анимация успеха
      gsap.to(puzzleRef.current, {
        backgroundColor: 'rgba(72, 187, 120, 0.1)',
        borderColor: '#48BB78',
        duration: 0.5,
      });
      gsap.to('.sequenceFeedback', {
        text: '✅ Верно! Следующее число: 13',
        duration: 0.5,
        ease: 'power2.out',
      });
      gsap.to('.sequencePuzzle', {
        scale: 0.95,
        y: -10,
        boxShadow: '0 10px 30px rgba(72, 187, 120, 0.3)',
        duration: 0.5,
      });
    } else {
      setHint('Подсказка: Это последовательность Фибоначчи.');
      gsap.fromTo(hintRef.current, 
        { opacity: 0, y: 10 },
        { opacity: 1, y: 0, duration: 0.3 }
      );
      gsap.fromTo('.sequenceFeedback', 
        { x: -10 }, 
        { x: 10, repeat: 3, duration: 0.1, yoyo: true, ease: 'power1.inOut' }
      );
      gsap.to('.sequenceFeedback', {
        text: '❌ Неверно. Попробуйте еще раз!',
        duration: 0.3,
      });
    }
  };

  return (
    <div ref={puzzleRef} className={`${styles.puzzleContent} sequencePuzzle`}>
      <h3 className={styles.puzzleTitle}>
        <span>🔢</span> Логическая последовательность
      </h3>
      <p className={styles.puzzleText}>
        Продолжите ряд: 1, 1, 2, 3, 5, 8, ...
      </p>
      <input
        type="text"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className={styles.input}
        placeholder="Введите следующее число..."
        disabled={isSolved}
      />
      <div ref={hintRef} className={`${styles.feedback} sequenceFeedback`}>
        {hint && <p className={styles.hint}>{hint}</p>}
      </div>
      <button 
        className={styles.actionButton}
        onClick={checkAnswer}
        disabled={isSolved}
        style={{ 
          background: isSolved 
            ? 'linear-gradient(135deg, #48BB78, #38A169)' 
            : 'linear-gradient(135deg, #00ADB5, #00969D)',
          cursor: isSolved ? 'not-allowed' : 'pointer'
        }}
      >
        {isSolved ? '✅ Решено!' : 'Проверить'}
      </button>
    </div>
  );
};

export default PuzzlesSection;