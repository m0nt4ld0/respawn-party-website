// src/components/LoginWithGoogle.jsx
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../api/firebase";

function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario autenticado con Google:", result.user);
      // Podés redirigir desde acá si querés, o confiar en la lógica del AuthContext
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <button onClick={handleGoogleLogin}>
      Iniciar sesión con Google
    </button>
  );
}

export default LoginWithGoogle;
