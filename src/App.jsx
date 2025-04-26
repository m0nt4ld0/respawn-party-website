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
import ShoppingCart from './pages/shoppingCart/ShoppingCart'; 
import ShoppingCartPage from './pages/ShoppingCartPage';

function App() {
  
  return (
    <ShoppingCart>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/ps-games" element={<PlaystationPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/nes-games" element={<ProjectorPage />} />
          <Route path="/arcade-games" element={<MultigamePage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ShoppingCart>
  );
}

export default App
