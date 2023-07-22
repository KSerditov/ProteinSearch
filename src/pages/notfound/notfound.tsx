import { useNavigate } from "react-router-dom";
import "./notfound.css";
import Header from "../../components/header/header";

const Notfound = () => {
  const navigate = useNavigate();

  const navSearch = () => {
    navigate("/search");
  };

  return (
    <>
    <Header/>
    <div className="notfound-content">
      <span className="notfound-header">404</span>
      <span className="notfound-description">Page not found</span>
      <button className="notfound-button" onClick={navSearch}>
        Back to Search
      </button>
    </div>
    </>
  );
};

export default Notfound;
