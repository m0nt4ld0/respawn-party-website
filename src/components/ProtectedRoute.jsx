// ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p>Cargando...</p>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
