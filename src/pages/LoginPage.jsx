import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";

import { sanitizeInput } from '../utils/sanitize';
import { useAuth } from "../contexts/AuthContext";
import { auth } from "../api/firebase";

import Content from '../layouts/Content';

// ✅ Componente interno (no default)
function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    try {
      const { GoogleAuthProvider, signInWithPopup } = await import('firebase/auth');
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error.message);
      alert("Error al iniciar sesión con Google: " + error.message);
    }
  };

  return (
    <div className="d-grid">
      <button onClick={handleGoogleLogin} className="btn btn-danger">
        Iniciar sesión con Google
      </button>
    </div>
  );
}

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      alert("Usuario o contraseña incorrectos");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      alert("Registro exitoso. Ya podés iniciar sesión.");
    } catch (error) {
      alert(`Error al registrar: ${error.message}`);
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/user");
    }
  }, [user, navigate]);

  return (
    <Content
      title="Somos Talento Games"
      seoTitle="Inicio"
      seoDescription="Descubrí los mejores juegos y consolas en alquiler en Talento Games."
      seoKeywords="venta consolas, videojuegos, Talento Games"
      seoUrl="https://talento-games.vercel.app/"
    >
      <div className="container py-5 mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow rounded-3 p-4">
              <h2 className="text-center mb-4 form-title">Iniciar Sesión</h2>

              <form>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>

                <div className="d-grid">
                  <button onClick={handleLogin} className="btn btn-primary">
                    Ingresar
                  </button>
                </div>
                <br />
                <div className="d-grid mb-2">
                  <button onClick={handleRegister} className="btn btn-outline-primary">
                    Registrarme
                  </button>
                </div>
              </form>

              <div className="text-center fw-bold my-3 form-label">o</div>

              <LoginWithGoogle />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}
