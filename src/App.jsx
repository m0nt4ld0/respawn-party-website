import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import { ConsoleProvider } from './contexts/ConsoleContext';

import ProtectedRoute from "./components/ProtectedRoute";

import { auth } from "./api/firebase";
import { onAuthStateChanged } from "firebase/auth";

import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';
import 'react-toastify/dist/ReactToastify.css';

// Componente de loading para Suspense fallback
const PageLoader = () => (
  <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
    <div className="spinner-border text-primary" role="status">
      <span className="visually-hidden">Cargando...</span>
    </div>
  </div>
);

// Wrapper para rutas protegidas con Suspense
const ProtectedRouteWrapper = ({ children, adminOnly = false }) => (
  <Suspense fallback={<PageLoader />}>
    <ProtectedRoute adminOnly={adminOnly}>
      {children}
    </ProtectedRoute>
  </Suspense>
);

// Lazy-loaded pages
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
const ShoppingCartPage = lazy(() => import('./pages/ShoppingCartPage'));

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <Suspense fallback={<PageLoader />}>
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Públicas */}
        <Route
          path="/login"
          element={
            <LoginPage />
          }
        />
        <Route
          path="/"
          element={
            <Homepage />
          }
        />
        <Route
          path="/about-us"
          element={
            <AboutPage />
          }
        />
        <Route
          path="/contact-us"
          element={
            <ContactPage />
          }
        />
        <Route
          path="/faq"
          element={
            <FAQPage />
          }
        />
        <Route
          path="/search"
          element={
            <SearchResultsPage />
          }
        />
        <Route
          path="/consoles"
          element={
            <ConsolePage />
          }
        />
        <Route
          path="/console/:id"
          element={
            <GamesPage />
          }
        />
        <Route
          path="/product/:id"
          element={
            <ProductDetailPage />
          }
        />
        <Route
          path="/shopping-cart"
          element={
            <ShoppingCartPage />
          }
        />
        <Route
          path="/checkout"
          element={
            <CheckoutPage />
          }
        />

        {/* Protegidas */}
        <Route
          path="/user"
          element={
            <ProtectedRouteWrapper>
              <UserPage />
            </ProtectedRouteWrapper>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRouteWrapper adminOnly={true}>
              <CustomProductPage />
            </ProtectedRouteWrapper>
          }
        />

        {/* Página 404 */}
        <Route
          path="*"
          element={
            <NotFoundPage />
          }
        />
      </Routes>
    </AnimatePresence>
    </Suspense>
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
