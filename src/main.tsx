import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";

import { AuthProvider } from "./firebase/firebaseauth.tsx";
import { AppRouter } from "./routes/routes.tsx";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.createRoot(document.querySelector("#root") as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <AppRouter />
      </Provider>
    </AuthProvider>
  </React.StrictMode>
);
