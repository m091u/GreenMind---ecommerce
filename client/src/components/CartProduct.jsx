import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart.context";
import axios from "axios";

// const API_URL = "http://localhost:4000";
// deploy link
const API_URL = "https://greenmind-6dox.onrender.com";

function CartProduct({ id, quantity }) {
  const { addToCart, removeFromCart, getSubtotal } = useCart();
  const [productData, setProductData] = useState();
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((response) => {
        setProductData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!productData) {
    return <p>Loading...</p>;
  }

  const newTotalPrice = getSubtotal(id).toFixed(2);

  const handleQuantityChange = (newQuantity) => {
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setUpdatedQuantity(newQuantity);
      addToCart(id, newQuantity);
    }
  };

  const handleRemoveFromCart = () => {
    removeFromCart(id);
  };

  return (
    <>
      <div className="cart-product">
        <div className="cart-details">
          <img src={productData.imageUrl} width={60} />
          <p className="flex-item">{productData.name}</p>
          <p className="flex-item">
            Quantity:
            <span className="quantity-controls" >
              <button onClick={() => handleQuantityChange(updatedQuantity - 1)}>
                -
              </button>
              <input
                type="number"
                min="1"
                value={updatedQuantity}
                onChange={(e) =>
                  handleQuantityChange(parseInt(e.target.value, 10))
                }
                className="quantity-input"
              />
              <button onClick={() => handleQuantityChange(updatedQuantity + 1)}>
                +
              </button>
            </span>
          </p>
          <p className="flex-item">
            Subtotal:{" "}
            <span style={{ whiteSpace: "nowrap" }}>{newTotalPrice} €</span>
          </p>
        </div>
        <div className="remove-button">
          <Button size="sm" onClick={handleRemoveFromCart}>
            Remove
          </Button>
        </div>
      </div>
      <hr></hr>
    </>
  );
}

export default CartProduct;
