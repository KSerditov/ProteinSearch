import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase/firebaseconfig";
import "./header.css";
import { useNavigate } from "react-router-dom";
import React from "react";

const Header: React.FC = () => {
  const navigate = useNavigate();

  const [login, setLogin] = React.useState("");

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        /*const uid = user.uid;
        console.log("uid", uid);*/
        setLogin(user.email ? user.email : "");
      } else {
        /*console.log("user is logged out");*/
        navigate("/");
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        console.error("Sign out error: " + error);
      });
  };

  return (
    <div className="app-header">
      <div className="app-header-login">{login}</div>
      <button className="app-header-button" onClick={handleLogout}>
        {"Log Out"}
      </button>
    </div>
  );
};

export default Header;
