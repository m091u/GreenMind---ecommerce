import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext({
  cartProducts: [],
  getTotalCost: () => 0,
  getSubtotal: () => 0,
  getProductQuantity: (productId) => 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([])

  
  // const addToCart = (productId, quantity) => {
  //   axios
  //     .post(`${API_URL}/api/cart`, {
  //       productId,
  //       quantity,
  //     })
  //     .then((response) => {
  //       const { cart, productData } = response.data;
  //       setCartProducts((prevCart) => {
  //         const cartArray = Array.isArray(prevCart) ? prevCart : [];

  //         const existingProductIndex = cartArray.findIndex(
  //           (item) => item.id === productId
  //         );

  //         if (existingProductIndex !== -1) {
  //           const updatedCart = [...cartArray];
  //           updatedCart[existingProductIndex] = {
  //             ...updatedCart[existingProductIndex],
  //             quantity: quantity,
  //           };
  //           console.log("Updated Cart:", updatedCart);
  //           return updatedCart;
  //         } else {
  //           const newCartItem = { id: productId, quantity };

  //           // Correctly access productData from the nested response.data
  //           if (productData) {
  //             newCartItem.name = productData.name;
  //             newCartItem.price = productData.price;
  //           }

  //           console.log("New Cart Item:", newCartItem);
  //           return [...cartArray, newCartItem];
  //         }
  //       });
  //     })
  //     .catch((error) => {
  //       console.error("Error adding to cart:", error);
  //     });
  // };

  const addToCart = async (productId, quantity) => {
    try {
      const response = await axios.post(`${API_URL}/api/cart`, {
        productId,
        quantity,
      });

      console.log("addToCart Response:", response.data);

      const { cart, productData } = response.data;
      setCartProducts((prevCart) => {
        const cartArray = Array.isArray(prevCart) ? prevCart : [];

        const existingProductIndex = cartArray.findIndex(
          (item) => item.id === productId
        );

        if (existingProductIndex !== -1) {
          const updatedCart = [...cartArray];
          updatedCart[existingProductIndex] = {
            ...updatedCart[existingProductIndex],
            quantity: quantity,
          };
          console.log("Updated Cart:", updatedCart);
          return updatedCart;
        } else {
          const newCartItem = { id: productId, quantity };

          // Correctly access productData from the nested response.data
          if (productData) {
            newCartItem.name = productData.name;
            newCartItem.price = productData.price;
          }

          console.log("New Cart Item:", newCartItem);
          return [...cartArray, newCartItem];
        }
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const removeFromCart = (productId) => {
    setCartProducts((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const getProductQuantity = (productId) => {
    const cartProduct = cartProducts.find(
      (product) => product.id === productId
    );
    return cartProduct ? cartProduct.quantity : 0;
  };

  const getSubtotal = (productId) => {
    const cartProduct = cartProducts.find(
      (product) => product.id === productId
    );
    return cartProduct.price * cartProduct.quantity.toFixed(2);
  };

  const getTotalCost = () => {
    // Calculate total cost using the cartProducts
    const total = cartProducts
      .reduce((acc, item) => {
        return acc + item.price * item.quantity;
      }, 0)
      .toFixed(2);

    console.log("Total Cost:", total);

    return total;
  };

  const contextValue = {
    cartProducts,
    getSubtotal,
    getTotalCost,
    getProductQuantity,
    addToCart,
    removeFromCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart, CartContext };
