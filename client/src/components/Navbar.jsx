import { Link } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../context/auth.context";

function Navbar() {
  // const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <nav className="nav">
      <div className="nav-left">
        <Link to="/">
          <button className="nav-button">Home</button>
        </Link>
        <Link to="/about">
          <button className="nav-button">Products</button>
        </Link>
      </div>
      <div className="nav-right">
        <Link to="/checkout">
          <button className="nav-button"><i class="fa-regular fa-cart-shopping"></i></button>
        </Link>
        <Link to="/login">
          <button className="nav-button"><i class="fas fa-user"></i></button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
