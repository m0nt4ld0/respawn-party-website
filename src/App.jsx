import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/ProtectedRoute";
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
import { auth } from "./api/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import LoginWithGoogle from "./components/LoginWithGoogle";

function App() {
  const [user, setUser] = useState(null);
  const [logueado, setLogueado] = useState(() => {
    const saved = localStorage.getItem("logueado");
    return saved === "true";
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    localStorage.setItem("logueado", logueado);
  }, [logueado]);

  return (
    <ShoppingCart>
      <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Homepage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/about-us" element={<AboutPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/contact-us" element={<ContactPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/console/:id" element={<GamesPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/faq" element={<FAQPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/consoles" element={<ConsolePage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/product/:id" element={<ProductDetailPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/user" element={<UserPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="/register" element={<RegisterPage logueado={logueado} setLogueado={setLogueado} />} />
          <Route path="*" element={<NotFoundPage logueado={logueado} setLogueado={setLogueado} />} />
        </Routes>
      </AuthProvider>
      </Router>
    </ShoppingCart>
  );
}

export default App;
