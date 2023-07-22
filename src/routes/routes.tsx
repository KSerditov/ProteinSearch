import { Route, BrowserRouter, Routes, useNavigate } from "react-router-dom";
import App from "../App";
import Search from "../pages/search/search";
import Protein from "../pages/protein/protein";
import Auth from "../pages/auth/auth";
import Notfound from "../pages/notfound/notfound";
import { useEffect } from "react";

const NotFoundRedirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/not-found");
  }, []);

  return null;
};

export const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/search" element={<Search />} />
        <Route path="/protein/:id" element={<Protein />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/not-found" element={<Notfound />} />
        <Route path="*" element={<NotFoundRedirect />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Routes;
