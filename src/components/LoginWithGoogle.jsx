import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../api/firebase";

function LoginWithGoogle() {
  const handleGoogleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
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
