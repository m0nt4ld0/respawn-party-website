import { useAuth } from "../contexts/AuthContext";

export default function DashboardPage() {
  const { user, logout } = useAuth();

  if (user === null) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.displayName || user.email}</h1>
      <button onClick={logout}>Cerrar sesión</button>
    </div>
  );
}
