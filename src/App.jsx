import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { useState, useEffect, Suspense, lazy } from 'react';
import { AuthProvider } from "./contexts/AuthContext";
import ShoppingCartProvider from './contexts/ShoppingCartContext';
import { ConsoleProvider } from './contexts/ConsoleContext';

// Pasa a lazy loading las páginas críticas también
const Homepage = lazy(() => import('./pages/Homepage'));
const LoginPage = lazy(() => import('./pages/LoginPage'));

import ProtectedRoute from "./components/ProtectedRoute";

// Lazy loading para las demás páginas
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const FAQPage = lazy(() => import('./pages/FAQPage'));
const ProductDetailPage = lazy(() => import('./pages/breadcrumb/ProductDetailPage'));
const ShoppingCartPage = lazy(() => import('./pages/ShoppingCartPage'));
const CheckoutPage = lazy(() => import('./pages/CheckoutPage'));
const ConsolePage = lazy(() => import('./pages/breadcrumb/ConsolePage'));
const GamesPage = lazy(() => import('./pages/breadcrumb/GamesPage'));
const UserPage = lazy(() => import('./pages/userPanel/UserPage'));
const CustomProductPage = lazy(() => import('./pages/CustomProductPage'));

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

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* LoginPage ahora lazy */}
        <Route 
          path="/login" 
          element={
            <Suspense fallback={<PageLoader />}>
              <LoginPage />
            </Suspense>
          } 
        />

        {/* Homepage ahora lazy */}
        <Route 
          path="/" 
          element={
            <Suspense fallback={<PageLoader />}>
              <Homepage />
            </Suspense>
          } 
        />
        
        {/* Rutas protegidas */}
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
        
        {/* Rutas de productos */}
        <Route 
          path="/console/:id" 
          element={
            <Suspense fallback={<PageLoader />}>
              <GamesPage />
            </Suspense>
          } 
        />
        <Route 
          path="/product/:id" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ProductDetailPage />
            </Suspense>
          } 
        />
        <Route 
          path="/consoles" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ConsolePage />
            </Suspense>
          } 
        />
        
        {/* Rutas de compras */}
        <Route 
          path="/shopping-cart" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ShoppingCartPage />
            </Suspense>
          } 
        />
        <Route 
          path="/checkout" 
          element={
            <Suspense fallback={<PageLoader />}>
              <CheckoutPage />
            </Suspense>
          } 
        />
        
        {/* Rutas de información */}
        <Route 
          path="/about-us" 
          element={
            <Suspense fallback={<PageLoader />}>
              <AboutPage />
            </Suspense>
          } 
        />
        <Route 
          path="/contact-us" 
          element={
            <Suspense fallback={<PageLoader />}>
              <ContactPage />
            </Suspense>
          } 
        />
        <Route 
          path="/faq" 
          element={
            <Suspense fallback={<PageLoader />}>
              <FAQPage />
            </Suspense>
          } 
        />
        
        {/* Búsqueda */}
        <Route 
          path="/search" 
          element={
            <Suspense fallback={<PageLoader />}>
              <SearchResultsPage />
            </Suspense>
          } 
        />
        
        {/* Página 404 */}
        <Route 
          path="*" 
          element={
            <Suspense fallback={<PageLoader />}>
              <NotFoundPage />
            </Suspense>
          } 
        />
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
