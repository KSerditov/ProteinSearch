import { useNavigate } from "react-router-dom";
import "./App.css";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase/firebaseconfig";

const App = () => {
  const navigate = useNavigate();

  const navLogin = () => {
    navigate("/auth");
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate("/search");
      }
    });

    return () => unsubscribe();
  }, []);
  
  return (
    <div className="app-main-wrapper">
      <div className="app-main">
        <span className="app-title">Q-1 Search</span>
        <span className="app-description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt u
        </span>
        <button className="app-login" onClick={navLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default App;
