import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext({
  cartProducts: [],
  getProductQuantity: () => {},
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    // Fetch initial cart data
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    axios
      .get(`${API_URL}/api/cart`)
      .then((response) => {
        setCartProducts(response.data);
        console.log("Cart Data fetched from server", response.data);
      })
      .catch((error) => {
        console.error("Error fetching cart data:", error);
      });
  };

  const addToCart = (productId, quantity) => {
    axios
      .post(`${API_URL}/api/cart`, {
        productId,
        quantity,
      })
      .then((response) => {
        setCartProducts(response.data);
        console.log("added to cart", response.data );
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const removeFromCart = (productId) => {
    axios
      .put(`${API_URL}/api/cart`, {
        productId,
      })
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  const clearCart = () => {
   axios.patch(`${API_URL}/api/cart`)
   .then((response)=> {
    setCartProducts(response.data);
   })
    .catch ((error) => {
      console.error("Error clearing cart:", error);
    })
  };

  const contextValue = {
    cartProducts,
    addToCart,
    removeFromCart,
    clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart, CartContext };
