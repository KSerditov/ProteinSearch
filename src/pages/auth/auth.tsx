import { onAuthStateChanged } from "firebase/auth";
import Login from "../../components/auth/login/login";
import Signup from "../../components/auth/signup/signup";
import "./auth.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../../firebase/firebaseconfig";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/search");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="auth-wrapper">
      <div className="auth-form-container">
        {isLogin ? <Login /> : <Signup />}

        <div className="auth-form-text-small">
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span className="auth-form-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Sign Up" : "Login"}
          </span>
          !
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
