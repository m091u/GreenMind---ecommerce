import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
import { CartProvider } from "./context/cart.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProviderWrapper>
    </Router>
  </React.StrictMode>
);
