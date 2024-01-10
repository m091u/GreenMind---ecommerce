import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import CartProduct from "../components/CartProduct";
import axios from "axios";

function CartPage() {
  const cart = useContext(CartContext);
  const [productsCount, setProductsCount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const cartProducts = cart.cartProducts;

  // stripe connect
  const handleCheckout = () => {
    axios
      .post(`${API_URL}/be_link`, { cartItems })
      .then((response) => {
        if (response.data.url) {
          window.location.href = response.data.url;
        }
      })
      .catch((err) => console.log(err.message));
  };
  useEffect(() => {
    // Update products count when the cart changes
    setProductsCount(cart.cartProducts.length);
    // Calculate total cost when the cart changes
    cart.getTotalCost().then((result) => {
      setTotalCost(result);
    });
  }, [cart.cartProducts, cart.getTotalCost]);

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
              <Button className="button-cart">Continue Shopping</Button>
            </Link>
            {cart.cartProducts.map((currentProduct, idx) => (
              <CartProduct
                key={idx}
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
              <Button className="cart-button">Proceed to Checkout</Button>
            </div>
          </div>
        )}
        
      </div>
    </>
  );
}

export default CartPage;
