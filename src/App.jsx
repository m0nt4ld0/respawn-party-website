import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Homepage from './pages/Homepage';
import { AuthProvider } from "./contexts/AuthContext";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
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
import CustomProductPage from './pages/CustomProductPage';
import { auth } from "./api/firebase";
import { onAuthStateChanged } from "firebase/auth";

function App() {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

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
          <Route
            path="/create-product"
            element={
              <ProtectedRoute>
                <CustomProductPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Homepage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/console/:id" element={<GamesPage />} />
          <Route path="/faq" element={<FAQPage  />} />
          <Route path="/consoles" element={<ConsolePage  />} />
          <Route path="/shopping-cart" element={<ShoppingCartPage  />} />
          <Route path="/product/:id" element={<ProductDetailPage  />} />
          <Route path="/user" element={<UserPage  />} />
          <Route path="*" element={<NotFoundPage  />} />
        </Routes>
      </AuthProvider>
      </Router>
    </ShoppingCart>
  );
}

export default App;
