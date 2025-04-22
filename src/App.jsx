import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import PlaystationPage from './pages/PlaystationPage';
import FAQPage from './pages/FAQPage';
import ProjectorPage from './pages/ProjectorPage';
import MultigamePage from './pages/MultigamePage';

function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/ps-5" element={<PlaystationPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/projector-1080p" element={<ProjectorPage />} />
        <Route path="/multigame" element={<MultigamePage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
