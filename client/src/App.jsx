// import { useState } from "react";
import "./App.css";
// import "@fortawesome/fontawesome-free/css/all.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
// import IsPrivate from "./components/IsPrivate";
import IsAnon from "./components/IsAnon";


function App() {
  // const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route
          path="/signup"
          element={
            <IsAnon>
              <SignupPage />
            </IsAnon>
          }
        />

        <Route
          path="/login"
          element={
            <IsAnon>
              <LoginPage />
            </IsAnon>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
