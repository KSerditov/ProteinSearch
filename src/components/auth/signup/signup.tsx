import React, { useMemo } from "react";
import "./signup.css";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../firebase/firebaseconfig";
import { FirebaseError } from "firebase/app";

export const emailRegex = new RegExp("[^@s]+@[^@s]+.[^@s]+$");
const lowerCaseRegex = new RegExp("[a-z]");
const upperCaseRegex = new RegExp("[A-Z]");
const numberRegex = new RegExp("[0-9]");

const Signup: React.FC = () => {
  const [login, setLogin] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [repeatPassword, setRepeatPassword] = React.useState("");
  const [errorMsg, setErrorMsg] = React.useState("");

  const validate = () => {
    if (login.length === 0) {
      setErrorMsg("");
      return true;
    }

    if (password !== repeatPassword) {
      setErrorMsg("Passwords do not match!");
      return true;
    }

    if (login.length > 0) {
      if (!emailRegex.test(login)) {
        setErrorMsg("Login must be a valid e-mail!");
        return true;
      }
    }

    if (password.length === 0 && repeatPassword.length === 0) {
      setErrorMsg("");
      return true;
    }

    if (
      (password.length > 0 || repeatPassword.length > 0) &&
      (password.length < 6 ||
        !lowerCaseRegex.test(password) ||
        !upperCaseRegex.test(password) ||
        !numberRegex.test(password))
    ) {
      setErrorMsg(
        "Password must be at least 6 symbols, contain uppercase, lowercase letter and a number."
      );
      return true;
    }

    setErrorMsg("");
    return false;
  };

  const disabled = useMemo(() => {
    return validate();
  }, [login, password, repeatPassword]);

  const handleSignUp = async () => {
    //TBD isSubmitting to block inputs while sign up is happening
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        login,
        password
      );
      const user = userCredential.user;
      console.info("User created: " + user);
    } catch (error: any) {
      const firebaseError = error as FirebaseError;
      const errorCode = firebaseError.code;
      const errorMessage = firebaseError.message;
      setErrorMsg("Sign Up Error: " + errorMessage + " code: " + errorCode);
    }
  };

  return (
    <>
      <h3 className="form-h3">Sign Up</h3>

      <label className="form-label" htmlFor="login-input">
        Email
      </label>
      <input
        className="form-input form-text-input"
        id="login-input"
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
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        name="password-input"
        placeholder="Enter your password"
      />

      <label className="form-label" htmlFor="password-input-repeat">
        Repeat Password
      </label>
      <input
        className="form-input form-text-input"
        id="password-input-repeat"
        type="password"
        value={repeatPassword}
        onChange={(e) => setRepeatPassword(e.target.value)}
        name="password-input-repeat"
        placeholder="Enter your password again"
      />

      <div className="error-message">{errorMsg}</div>
      
      <button
        className="form-button"
        onClick={handleSignUp}
        disabled={disabled}
      >
        Create Account
      </button>
    </>
  );
};

export default Signup;
