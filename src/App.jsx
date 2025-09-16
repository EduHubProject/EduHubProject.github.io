import './styles/style.css';
import React, { 
  Suspense, 
  lazy, 
  memo, 
  useEffect, 
  createContext, 
  useState,
  useMemo 
} from 'react';
import { 
  BrowserRouter, 
  Routes,
  Route,
  useLocation 
} from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { LanguageProvider } from './utils/LanguageContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const GlobalContext = createContext({
  globalState: null,
  setGlobalState: () => {}
});

// Явные ленивые импорты с default exports
const Header = lazy(() => import('./components/Header').then(module => ({ default: module.default })));
const Footer = lazy(() => import('./components/Footer').then(module => ({ default: module.default })));
const MainSection = lazy(() => import('./components/MainSection').then(module => ({ default: module.MainSection })));
const AboutSection = lazy(() => import('./components/MainSection').then(module => ({ default: module.AboutSection })));
const PracticeWork = lazy(() => import('./components/MainSection').then(module => ({ default: module.PracticeWork })));
const ContactSection = lazy(() => import('./components/MainSection').then(module => ({ default: module.ContactSection })));
const Puzzles = lazy(() => import('./components/Puzzles').then(module => ({ default: module.default })));
const Test = lazy(() => import('./components/Test').then(module => ({ default: module.default })));
const Results = lazy(() => import('./components/Results').then(module => ({ default: module.default })));
const NotFound = lazy(() => import('./components/404/NotFound').then(module => ({ default: module.default })));
const Survey = lazy(() => import('./components/Survey/Survey').then(module => ({ default: module.default })));
const RealLife = lazy(() => import('./components/RealLife/RealLifePuzzles').then(module => ({ default: module.default })));
const CategoryDetail = lazy(() => import('./components/RealLife/CategoryDetail').then(module => ({ default: module.default })));
const PuzzleSolvingPage = lazy(() => import('./components/RealLife/PuzzleSolvingPage').then(module => ({ default: module.default })));
const ResultPage = lazy(() => import('./components/RealLife/ResultPage').then(module => ({ default: module.default })));
const Solutions = lazy(() => import('./components/VisualisationSolutions/Solutions').then(module => ({ default: module.default })));
const SolutionType = lazy(() => import('./components/VisualisationSolutions/SolutionType').then(module => ({ default: module.default })));
const SolutionVisualization = lazy(() => import('./components/VisualisationSolutions/SolutionVisualization').then(module => ({ default: module.default })));
const PuzzlesPage = lazy(() => import('./components/PuzzlePage/PuzzlesPage').then(module => ({ default: module.default })));
const PuzzleTestNG = lazy(() => import('./components/PuzzlePage/PuzzleTestNG').then(module => ({ default: module.default })));
const ResultOfNGTest = lazy(() => import('./components/PuzzlePage/ResultOfNGTest').then(module => ({ default: module.default })));
const PuzzlesSection = lazy(() => import('./components/CommissionPuzzles/CommissionPuzzles').then(module => ({ default: module.default })));
const PuzzleCategoriesNG = lazy(() => import('./components/PuzzlePage/PuzzleCategoriesNG').then(module => ({ default: module.default })));

const AppContent = memo(() => {
  // Хуки должны быть вызваны в строгом порядке
  const [globalState, setGlobalState] = useState({
    theme: 'light',
    user: null,
    language: 'ru'
  });
  
  const location = useLocation(); // Хук всегда вызывается первым

  // Мемоизированный список путей
  const isKnownPath = useMemo(() => [
    '/',
    '/puzzles',
    '/test',
    '/results',
    '/survey',
    '/rlpuzzles',
    '/solutions',
    '/sgpuzzles',
    '/commission-puzzles'
  ].some(path => location.pathname.startsWith(path)), [location]);

  // Эффект для обработки якорей
  useEffect(() => {
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));
    
    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <GlobalContext.Provider value={{ globalState, setGlobalState }}>
      <LanguageProvider>
        {/* Header */}
        {isKnownPath && (
          <Suspense fallback={<div className="loading">Загрузка хедера...</div>}>
            <Header />
          </Suspense>
        )}

        {/* Main Content */}
        <main className="page">
          <Suspense fallback={<div className="loading">Загрузка контента...</div>}>
            <Routes>
              <Route path="/" element={
                <>
                  <MainSection />
                  <AboutSection />
                  <PracticeWork />
                  <ContactSection />
                </>
              } />
              <Route path="/puzzles" element={<Puzzles />} />
              <Route path="/test/:puzzleType" element={<Test />} />
              <Route path="/results/:id" element={<Results />} />
              <Route path="/survey" element={<Survey />} />
              <Route path="/rlpuzzles" element={<RealLife />} />
              <Route path="/rlpuzzles/:categoryId" element={<CategoryDetail />} />
              <Route path="/rlpuzzles/:categoryId/test" element={<PuzzleSolvingPage />} />
              <Route path="/rlpuzzles/:categoryId/result" element={<ResultPage />} />
              <Route path="/solutions" element={<Solutions />} />
              <Route path="/solutions/:solutionType" element={<SolutionType />} />
              <Route path="/solutions/:solutionType/:puzzleId" element={<SolutionVisualization />} />
              <Route path="/sgpuzzles" element={<PuzzlesPage />} />
              <Route path="/puzzle-categories" element={<PuzzleCategoriesNG />} />
              <Route path="/puzzle-test/:categoryId" element={<PuzzleTestNG />} />
              <Route path="/puzzle-result" element={<ResultOfNGTest />} />
              <Route path="/jury-puzzles" element={<PuzzlesSection />} />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>

        {/* Footer */}
        {isKnownPath && (
          <Suspense fallback={<div className="loading">Загрузка футера...</div>}>
            <Footer />
          </Suspense>
        )}

        <ToastContainer 
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </LanguageProvider>
    </GlobalContext.Provider>
  );
});

const MainApp = () => (
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <AppContent />
    </I18nextProvider>
  </BrowserRouter>
);

export default MainApp;