import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// import '@fortawesome/fontawesome-free/css/all.min.css';

import { BrowserRouter as Router } from "react-router-dom";
import { AuthProviderWrapper } from "./context/auth.context";
// import { CartProviderWrapper } from "./context/cart.context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <AuthProviderWrapper> 
      {/* <CartProviderWrapper> */}
      <App />
      {/* </CartProviderWrapper>    */}
      </AuthProviderWrapper> 
    </Router>
  </React.StrictMode>
);
