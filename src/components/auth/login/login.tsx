import "./login.css";
import React, { useMemo } from "react";
import { emailRegex } from "../signup/signup";
import { auth } from "../../../firebase/firebaseconfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const validate = () => {
    if (login.length === 0) {
      setErrorMsg("");
      return true;
    }

    if (!emailRegex.test(login)) {
      setErrorMsg("Login must be a valid e-mail!");
      return true;
    }

    if (password.length === 0) {
      setErrorMsg("");
      return true;
    }

    if (password.length < 6) {
      setErrorMsg("Password must be at least 6 symbols!");
      return true;
    }

    setErrorMsg("");
    return false;
  };

  const disabled = useMemo(() => {
    return validate();
  }, [login, password]);

  const handleLogin = async () => {
    //TBD isSubmitting to block inputs while login is happening
    signInWithEmailAndPassword(auth, login, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log("User signed in: " + user.email);
        navigate("/search");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setErrorMsg("Login Error: " + errorMessage + " code: " + errorCode);
      });
  };

  return (
    <>
      <h3 className="form-h3">Login</h3>

      <label className="form-label" htmlFor="login-input">
        Email
      </label>
      <input
        className="form-input form-text-input"
        id="login-input"
        autoComplete="current-login"
        type="email"
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        name="login-input"
        placeholder="Enter your email"
      />

      <label className="form-label" htmlFor="password-input">
        Password
      </label>
      <input
        className="form-input form-text-input"
        id="password-input"
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password-input"
        placeholder="Enter your password"
      />

      <div className="error-message">{errorMsg}</div>
      
      <button className="form-button" disabled={disabled} onClick={handleLogin}>
        Login
      </button>
    </>
  );
};

export default Login;
