import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/contacto" element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App
