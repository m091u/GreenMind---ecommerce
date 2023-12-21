import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart.context";

import axios from "axios";

const API_URL = "http://localhost:4000";

function ModalComponent({ id, quantity, productDataProp }) {
  const { getProductQuantity, removeFromCart } = useCart();
  const [productData, setProductData] = useState(productDataProp);
  const [updatedQuantity, setUpdatedQuantity] = useState(quantity);

  useEffect(() => {
    if (!productData) {
      axios
        .get(`${API_URL}/api/products/${id}`)
        .then((response) => {
          setProductData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching product details:", error);
        });
    }
  }, [id, productData, quantity]);

  if (!productData) {
    // Data is still being loaded
    return <p>Loading...</p>;
  }

  const quantityInCart = getProductQuantity(id);

  const handleQuantityChange = (e) => {
    // Ensure the quantity is a positive integer
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setUpdatedQuantity(newQuantity);
    }
  };

  const newTotalPrice = (updatedQuantity * productData.price).toFixed(2);

  return (
    <>
      <div className="cart-product">
        <img src={productData.imageUrl} width={60} />
        <p className="flex-item">{productData.name}</p>
        <p className="flex-item">Quantity: {quantityInCart}</p>
        <p className="flex-item">Price: {newTotalPrice} €</p>
      </div>
      <hr></hr>
    </>
  );
}

export default ModalComponent;
