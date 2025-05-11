import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import HomePage from './pages/HomePage';
import FormulatorPage from './pages/FormulatorPage';
import ColorTheoryPage from './pages/ColorTheoryPage';
import ResultsPage from './pages/ResultsPage';
import AIConsultationPage from './pages/AIConsultationPage';
import FaceAnalysisPage from './pages/FaceAnalysisPage';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/formulator" element={<FormulatorPage />} />
            <Route path="/color-theory" element={<ColorTheoryPage />} />
            <Route path="/results/:id" element={<ResultsPage />} />
            <Route path="/ai-consultation" element={<AIConsultationPage />} />
            <Route path="/face-analysis" element={<FaceAnalysisPage />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
}

export default App; 