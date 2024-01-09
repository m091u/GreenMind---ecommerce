
import "./App.css";
import { Routes, Route } from "react-router-dom";
import NavbarComponent from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductsPage from "./pages/ProductsPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/UserProfilePage";
import CartPage from "./pages/CartPage";
import IsAnon from "./components/IsAnon";
import IsPrivate from "./components/IsPrivate";
import Success from "./components/Success";

function App() {

  return (
    <div className="App">
      <NavbarComponent />
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/products" element={<ProductsPage />} />

        <Route path="/products/:productId" element={<ProductDetailsPage />} />

        <Route path="/cart" element={<CartPage />} />

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

        <Route path="/success" element={<Success />}/>

        <Route
          path="/profile"
          element={
            <IsPrivate>
              <ProfilePage />
            </IsPrivate>
          }
        />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
