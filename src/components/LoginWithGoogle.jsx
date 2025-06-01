import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../api/firebase";

function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      console.log("Usuario autenticado con Google:", result.user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <button className="btn btn-danger" onClick={handleGoogleLogin}>
      Iniciar sesión con Google
    </button>
  );
}

export default LoginWithGoogle;
