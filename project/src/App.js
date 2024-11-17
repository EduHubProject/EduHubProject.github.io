import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import { MainSection, AboutSection, PracticeWork } from './components/MainSection';
import './styles/style.css';

const App = React.memo(() => {
  return (
    <div>
      <Header />
      <main className="page">
        <MainSection />
        <AboutSection />
        <PracticeWork />
      </main>
      <Footer />
    </div>
  );
});

export default App;
