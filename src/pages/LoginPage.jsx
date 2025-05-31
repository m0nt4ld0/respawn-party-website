import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginWithGoogle from "../components/LoginWithGoogle";
import Content from '../layouts/Content';

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(email, password);
    if (!success) {
      alert("Usuario o contraseña incorrectos");
    }
  };

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  return (
    <Content>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-md-6 col-lg-4">
            <div className="card shadow rounded-3 p-4">
              <h2 className="text-center mb-4">Iniciar Sesión</h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
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
                  <button type="submit" className="btn btn-primary">
                    Ingresar
                  </button>
                </div>
              </form>

              <div className="text-center fw-bold my-3">o</div>

              <LoginWithGoogle />
            </div>
          </div>
        </div>
      </div>
    </Content>
  );
}
