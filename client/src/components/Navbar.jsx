import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";

function Navbar() {

  const authContextValue = useContext(AuthContext);
  console.log('Auth Context Value:', authContextValue);

  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <nav className="nav">
      <div className="nav-left">
        <h1>GreenMind</h1>
        <div>
          <Link to="/">
            <button className="nav-button">Home</button>
          </Link>
        </div>
        <div>
          <Link to="/products">
            <button className="nav-button">Products</button>
          </Link>
        </div>
      </div>
      <div className="nav-right">
        <Link to="/checkout">
          <button className="nav-button">
            <i className="fas fa-shopping-cart"></i>
          </button>
        </Link>
        <Link to="/login">
          <button className="nav-button">
            <i className="fas fa-user"></i>
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
