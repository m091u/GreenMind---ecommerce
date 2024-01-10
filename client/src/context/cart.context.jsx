import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext({
  cartProducts: [],
  getTotalCost: () => 0,
  getProductQuantity: (productId) => 0,
  addToCart: () => {},
  removeFromCart: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  const addToCart = (productId, quantity) => {
    axios
      .post(`${API_URL}/api/cart`, {
        productId,
        quantity,
      })
      .then((response) => {
        setCartProducts((prevCart) => {
          // Ensure prevCart is an array
          const cartArray = Array.isArray(prevCart) ? prevCart : [];
  
          // Check if the product is already in the cart
          const existingProductIndex = cartArray.findIndex(
            (item) => item.id === productId
          );
  
          if (existingProductIndex !== -1) {
            // If the product is already in the cart, update its quantity
            const updatedCart = [...cartArray];
            updatedCart[existingProductIndex] = {
              ...updatedCart[existingProductIndex],
              quantity: quantity,
            };
            console.log('Updated Cart:', updatedCart);
            return updatedCart;
          } else {
            // If the product is not in the cart, add it
            const newCartItem = { id: productId, quantity };
            console.log('New Cart Item:', newCartItem);
            return [...cartArray, newCartItem];
          }
        });
        console.log();
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
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

  const getProductData = (productId) => {
    return axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        return null;
      });
  };

  const getTotalCost = async () => {
    let totalCost = 0;

    for (const item of cartProducts) {
      try {
        const productData = await getProductData(item.id);

        if (productData) {
          const subtotal = productData.price * item.quantity;
          totalCost += subtotal;

          // console.log(`Item ID: ${item.id}`);
          // console.log(`Product Price: ${productData.price}`);
          // console.log(`Item Quantity: ${item.quantity}`);
          // console.log(`Subtotal for Item ${item.id}: ${subtotal}`);
          // console.log(`Updated Total Cost: ${totalCost}`);
        }
      } catch (error) {
        console.error(`Error calculating cost for item ${item.id}:`, error);
      }
    }
    return totalCost.toFixed(2);
  };

  const contextValue = {
    cartProducts,
    getTotalCost,
    getProductQuantity,
    addToCart,
    removeFromCart,
    // clearCart,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

function useCart() {
  return useContext(CartContext);
}

export { CartProvider, useCart, CartContext };
