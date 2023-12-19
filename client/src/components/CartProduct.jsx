import Button from "react-bootstrap/Button";
import React, { useState, useEffect } from "react";
import { useCart } from "../context/cart.context";
import axios from "axios";

const API_URL = "http://localhost:4000";

function CartProduct({ id, quantity, productDataProp}) {
  const { getProductQuantity, removeFromCart } = useCart();
  const [productData, setProductData] = useState(productDataProp);

  // const { productId } = useParams();

  useEffect(() => {
    if (!productDataProp) {
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        setProductData(response.data);
        console.log("Extract product details for cart item", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
    }
  }, [id,productDataProp]);


  if (!productData) {
    // Data is still being loaded
    return <p>Loading...</p>;
  }

  const quantityInCart = getProductQuantity(productId);
  const handleRemoveFromCart = () => {
    removeFromCart(productId);
  };

  return (
    <>
      <h3>{productData.title}</h3>
      <p>Quantity in Cart: {quantityInCart}</p>
      <p>Euro {(quantityInCart * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={handleRemoveFromCart}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
}

export default CartProduct;
