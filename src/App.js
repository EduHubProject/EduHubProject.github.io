import './styles/style.css';
import React, { Suspense, lazy, memo, useEffect } from 'react';
import 'react-toastify/dist/ReactToastify.css';

const Header = lazy(() => import('./components/Header'));
const Footer = lazy(() => import('./components/Footer'));

// Используйте правильные пути и имена при импорте
const MainSection = lazy(() =>
  import('./components/MainSection').then(module => ({ default: module.MainSection }))
);
const AboutSection = lazy(() =>
  import('./components/MainSection').then(module => ({ default: module.AboutSection }))
);
const PracticeWork = lazy(() =>
  import('./components/MainSection').then(module => ({ default: module.PracticeWork }))
);
const ContactSection = lazy(() =>
  import('./components/MainSection').then(module => ({ default: module.ContactSection }))
);


const App = memo(() => {
  useEffect(() => {
    const handleAnchorClick = (e) => {
      e.preventDefault();
      const targetId = e.currentTarget.getAttribute('href');
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
      }
    };

    const anchors = document.querySelectorAll('a[href^="#"]');
    anchors.forEach(anchor => anchor.addEventListener('click', handleAnchorClick));

    return () => {
      anchors.forEach(anchor => anchor.removeEventListener('click', handleAnchorClick));
    };
  }, []);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div>
        <Header />
        <main className="page">
          <MainSection />
          <AboutSection />
          <PracticeWork />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </Suspense>
  );
});

export default App;
