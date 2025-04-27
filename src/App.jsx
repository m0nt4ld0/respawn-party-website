import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './pages/Homepage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ShoppingCart from './pages/shoppingCart/ShoppingCart'; 
import ShoppingCartPage from './pages/ShoppingCartPage';
import ConsolePage from './pages/breadcrumb/ConsolePage';
import GamesPage from './pages/breadcrumb/GamesPage';

function App() {
  
  return (
    <ShoppingCart>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/console/:id" element={<GamesPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/consoles" element={<ConsolePage />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </ShoppingCart>
  );
}

export default App
