import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { CartContext } from '../context/cart.context';

const API_URL = "http://localhost:4000";

function ProductCard({ _id, name, imageUrl, price, inStock }) {
  return (
    <>
      <div className="product-card">
        <Link
          to={`/products/${_id}`}
          style={{ textDecoration: "none", color: "inherit" }}
          className="product-link"
        >
          <img src={imageUrl} className="plant-image" alt="Plant image" />
          {/* <div className="icon-container"> */}
            <Link
              to={`/cart`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="cart-link"
            >
              <i className="fa-regular fa-cart-shopping add-to-basket-icon"></i>
            </Link>
            <Link
              to={`/cart`}
              style={{ textDecoration: "none", color: "inherit" }}
              className="cart-link"
            >
              <i class="fa-regular fa-heart add-to-basket-icon"></i>
            </Link>
          {/* </div> */}
          <p>
            <strong>{name}</strong>
          </p>
        </Link>
        <p>€ {price}</p>
        {inStock ? (
          <p>In stock</p>
        ) : (
          <p style={{ color: "red" }}>Out of stock</p>
        )}
      </div>
    </>
  );
}

export default ProductCard;
