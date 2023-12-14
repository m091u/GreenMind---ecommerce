import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useHistory , useNavigate} from 'react-router-dom';
import axios from "axios";
import { CartContext } from "../context/cart.context";

const API_URL = "http://localhost:4000";

function ProductCard({ _id, name, imageUrl, price }) {
  // const history = useHistory();
  const cart = useContext(CartContext);

  const handleAddToCart = () => {
    cart.addToCart(_id);
    console.log("clicked");
    // Redirect to the cart page
    // history.push("/cart");
  };

  return (
    <>
      <div className="product-card">
        <img src={imageUrl} className="plant-image" alt="Plant image" />

        <div className="icon-container">
          <button
            onClick={handleAddToCart}
            className="details-link"
            style={{ textDecoration: "none", color: "inherit", border: "none" }}
          >
            <i
              className="fas fa-shopping-cart add-to-basket-icon"
              style={{ color: "#fff" }}
            ></i>
          </button>

          <Link
            to={`/products/${_id}`}
            style={{ textDecoration: "none", color: "inherit" }}
            className="details-link"
          >
            <i
              className="fas fa-circle-info add-to-basket-icon"
              style={{ color: "#fff" }}
            ></i>
          </Link>

          {/* <Link
              to={`/wishlist`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="wishlist-link"
            >
              <i
                className="fa-regular fa-heart add-to-basket-icon"
                style={{ color: "#fff" }}
              ></i>
            </Link> */}
        </div>
        <p>
          <strong>{name}</strong>
        </p>

        <p>€ {price}</p>
      </div>
    </>
  );
}

export default ProductCard;
