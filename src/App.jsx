import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import { ConsoleProvider } from './contexts/ConsoleContext';

import ProtectedRoute from "./components/ProtectedRoute";
import ShoppingCartPage from './pages/ShoppingCartPage';

import { auth } from "./api/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = lazy(() => import('./pages/Homepage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const ProductDetailPage = lazy(() => import('./pages/breadcrumb/ProductDetailPage'));

const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ConsolePage = lazy(() => import('./pages/breadcrumb/ConsolePage'));
const GamesPage = lazy(() => import('./pages/breadcrumb/GamesPage'));
const UserPage = lazy(() => import('./pages/userPanel/UserPage'));
const CustomProductPage = lazy(() => import('./pages/CustomProductPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<div className="text-center p-5">Cargando...</div>}>
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
      </Suspense>
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
