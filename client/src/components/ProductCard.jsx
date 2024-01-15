import { useState, useContext } from "react";
import { Link } from "react-router-dom";
// import { useHistory , useNavigate} from 'react-router-dom';
import axios from "axios";
import { CartContext } from "../context/cart.context";

// const API_URL = "http://localhost:4000";
// deploy link
const API_URL = "https://greenmind-6dox.onrender.com"

function ProductCard({ _id, name, imageUrl, price }) {
  // const history = useHistory();
  const cart = useContext(CartContext);

  const handleAddToCart = () => {
    cart.addToCart(_id, 1);
  };

  return (
    <>
      <div className="product-card">
        <img src={imageUrl} className="plant-image" alt="Plant image" />

        <div className="icon-container" title="Add to cart">
          <button
            onClick={handleAddToCart}
            className="details-link"
            style={{ textDecoration: "none", color: "inherit", border: "none" }}
          >
            <i
              className="fas fa-shopping-cart add-to-basket-icon"
              style={{ color: "#fff" }}
            ></i>{" "}
          </button>
          <div title="Details">
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
          </div>
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
