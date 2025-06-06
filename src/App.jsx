import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import { ConsoleProvider } from './contexts/ConsoleContext';

import SearchResultsPage from './pages/SearchResultsPage';
import Homepage from './pages/Homepage';
import LoginPage from "./pages/LoginPage";
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ProductDetailPage from './pages/breadcrumb/ProductDetailPage';
import ShoppingCartPage from './pages/ShoppingCartPage';
import CheckoutPage from './pages/CheckoutPage';
import ConsolePage from './pages/breadcrumb/ConsolePage';
import GamesPage from './pages/breadcrumb/GamesPage';
import UserPage from './pages/userPanel/UserPage';
import CustomProductPage from './pages/CustomProductPage';

import ProtectedRoute from "./components/ProtectedRoute";

import { auth } from "./api/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/user"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly={true}>
              <CustomProductPage />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Homepage />} />
        <Route path="/about-us" element={<AboutPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/console/:id" element={<GamesPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/consoles" element={<ConsolePage />} />
        <Route path="/shopping-cart" element={<ShoppingCartPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/search" element={<SearchResultsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <HelmetProvider>
      <Router>
        <AuthProvider>
          <ConsoleProvider>
            <ShoppingCartProvider>
              <ToastContainer position="bottom-right" autoClose={2000} />
              <AnimatedRoutes />
            </ShoppingCartProvider>
          </ConsoleProvider>
        </AuthProvider>
      </Router>
    </HelmetProvider>
  );
}

export default App;
