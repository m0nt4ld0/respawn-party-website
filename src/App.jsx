import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ShoppingCart from './pages/shoppingCart/ShoppingCart';
import ProductDetailPage from './pages/breadcrumb/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import ConsolePage from './pages/breadcrumb/ConsolePage';
import GamesPage from './pages/breadcrumb/GamesPage';
import UserPage from './pages/userPanel/UserPage';

function App() {
  const [logueado, setLogueado] = useState(() => {
    const saved = localStorage.getItem("logueado");
    return saved === "true";
  });

  useEffect(() => {
    localStorage.setItem("logueado", logueado);
  }, [logueado]);

  return (
    <ShoppingCart>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/about-us" element={<AboutPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/contact-us" element={<ContactPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/console/:id" element={<GamesPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/faq" element={<FAQPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/consoles" element={<ConsolePage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/product/:id" element={<ProductDetailPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/user" element={<UserPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="*" element={<NotFoundPage logueado={logueado} setLogueado={setLogueado} />} />
        </Routes>
      </Router>
    </ShoppingCart>
  );
}

export default App;
