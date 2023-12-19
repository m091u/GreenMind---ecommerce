import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext({
  cartProducts: [],
  getTotalCost: () => 0,
  getProductQuantity: (productId) => 0,
  addToCart: () => {},
  removeFromCart: () => {},
  clearCart: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const [productsData, setProductsData] = useState([]);

  useEffect(() => {
    // Fetch initial cart data
    fetchCartData();
  }, []);

  const fetchCartData = () => {
    axios
      .get(`${API_URL}/api/cart`)
      .then((response) => {
        console.log("Cart Data fetched from server", response.data);
        setCartProducts(response.data);
       
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
        setCartProducts((prevCart) => {
          // Ensure prevCart is an array
          const cartArray = Array.isArray(prevCart) ? prevCart : [];

          // Check if the product is already in the cart
          const existingProduct = cartArray.find(
            (item) => item.id === productId
          );

          if (existingProduct) {
            // If the product is already in the cart, update its quantity
            return cartArray.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // If the product is not in the cart, add it
            return [...cartArray, { id: productId, quantity }];
          }
        });

        console.log("added to cart", response.data);
        setCartProducts((prevCart) => {
          // Ensure prevCart is an array
          const cartArray = Array.isArray(prevCart) ? prevCart : [];

          // Check if the product is already in the cart
          const existingProduct = cartArray.find(
            (item) => item.id === productId
          );

          if (existingProduct) {
            // If the product is already in the cart, update its quantity
            return cartArray.map((item) =>
              item.id === productId
                ? { ...item, quantity: item.quantity + quantity }
                : item
            );
          } else {
            // If the product is not in the cart, add it
            return [...cartArray, { id: productId, quantity }];
          }
        });

        console.log("added to cart", response.data);
      })
      .catch((error) => {
        console.error("Error adding to cart:", error);
      });
  };

  const removeFromCart = (productId) => {
    console.log("Removing from cart:", productId);

    console.log("Removing from cart:", productId);

    axios
      .put(`${API_URL}/api/cart`, {
        productId,
      })
      .then((response) => {
        console.log("Server response:", response.data);
        console.log("Server response:", response.data);
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.error("Error removing from cart:", error);
      });
  };

  const clearCart = () => {
    axios
      .patch(`${API_URL}/api/cart`)
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      });
    axios
      .patch(`${API_URL}/api/cart`)
      .then((response) => {
        setCartProducts(response.data);
      })
      .catch((error) => {
        console.error("Error clearing cart:", error);
      });
  };

  const getProductQuantity = (productId) => {
    const cartProduct = cartProducts.find(
      (product) => product.id === productId
    );
    const cartProduct = cartProducts.find(
      (product) => product.id === productId
    );
    return cartProduct ? cartProduct.quantity : 0;
  };

  const getProductData = (productId) => {
   return axios
   .get(`${API_URL}/api/products/${productId}`)
    .then((response)=> {
      console.log("Get product data for total", response.data);
      response.data})
    .catch((error) => {
      console.error("Error fetching product data:", error);
      return null;
    })
    }
  
  const getTotalCost = () => {

    let total = 0;
    cartProducts.forEach((cartItem) => {
      // Assuming cartItem.id is the product ID
      const productData = getProductData(cartItem.id);
      
      // Assuming productData.price is the product price
      total += productData ? productData.price * cartItem.quantity : 0;
    });
  
    return total;
  };

  const contextValue = {
    cartProducts,
    getTotalCost,
    getProductQuantity,
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
