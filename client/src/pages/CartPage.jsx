import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Table } from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import CartProduct from "../components/CartProduct";

function CartPage() {
  const cart = useContext(CartContext);
  const [productsCount, setProductsCount] = useState(0);
  const cartProducts = cart.cartProducts;

  const calculateCartTotal = (cartProducts) => {
    let totalCost = 0;
 
  };
  

  useEffect(() => {
    // Update products count when the cart changes
    setProductsCount(cart.cartProducts.length);
    // Calculate total cost when the cart changes
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
              <Button className="button-cart">Continue Shopping</Button>
            </Link>
            {cart.cartProducts.map((currentProduct, idx) => (
              <CartProduct
                key={idx}
                id={currentProduct.id}
                quantity={currentProduct.quantity}
                productData={currentProduct.productDataProp}
              ></CartProduct>
            ))}

            <h3>Total: € {calculateCartTotal()}</h3>
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
