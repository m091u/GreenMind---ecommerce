import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart.context";
import { useParams } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000";

function CartProduct({ id, quantity }) {
  const { getProductQuantity, removeFromCart } = useCart();
  const [productData, setProductData] = useState(null);
  // const { productId } = useParams();

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products/${id}`)
      .then((response) => {
        setProductData(response.data);
        // /console.log("Extract product details for cartProduct", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!productData) {
    // Data is still being loaded
    return <p>Loading...</p>;
  }

  const quantityInCart = getProductQuantity(id);

  const handleRemoveFromCart = () => {
    console.log("Removing product with id:", id);
    removeFromCart(id);
  };

  return (
    <>
    <div className="cart-product">
      <img src={productData.imageUrl} width={60}/>
      <p>{productData.name}</p>
      <p>Quantity: {quantityInCart}</p>
      <p>Price: {(quantityInCart * productData.price).toFixed(2)} €</p>
      <Button size="sm" onClick={handleRemoveFromCart}>
        Remove
      </Button>
      </div>
      <hr></hr>
    </>
  );
}

export default CartProduct;
