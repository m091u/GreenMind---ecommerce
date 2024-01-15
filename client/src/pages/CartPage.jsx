import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import CartProduct from "../components/CartProduct";
import axios from "axios";

// const API_URL = "http://localhost:4000";
// deploy link
const API_URL = "https://greenmind-6dox.onrender.com"


function CartPage() {
  const cart = useContext(CartContext);
  const [productsCount, setProductsCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const cartProducts = cart.cartProducts;

  // Stripe 
  const handleCheckout = () => {
    axios
      .post(`${API_URL}/api/create-checkout-session`, { cartProducts })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => {
        console.error("Error creating checkout session:", err.message);
      });
  };

  useEffect(() => {
    // Update products count when the cart changes
    setProductsCount(cart.cartProducts.length);
  
    // Calculate total cost when the cart changes
    const totalCost = cart.getTotalCost();
    setTotalCost(totalCost);
  }, [cart.cartProducts]);
  

  return (
    <>
      <div className="cart-page">
        <h2>Cart</h2>

        {!cart.cartProducts.length && (
          <div className="empty-cart">
            <h4>Your cart is empty.</h4>
            <Link to="/products">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Button>Shop now</Button>
              </div>
            </Link>
          </div>
        )}

        {cart.cartProducts.length > 0 && (
          <div>
            <Link to="/products">
              <Button variant="secondary" className="button-cart">Continue Shopping</Button>
            </Link>
            {cart.cartProducts.map((currentProduct) => (
              <CartProduct
                key={currentProduct.id}
                id={currentProduct.id}
                quantity={currentProduct.quantity}
                productData={currentProduct.productData}
              ></CartProduct>
            ))}

            <h3>Total: € {totalCost}</h3>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Button onClick={handleCheckout} variant="primary">Proceed to Checkout</Button>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default CartPage;
