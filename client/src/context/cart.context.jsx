import { createContext, useState, useContext, useEffect } from "react";
import { AuthContext } from "./auth.context";
import axios from "axios";

const API_URL = "http://localhost:4000";

const CartContext = createContext({
  items: [],
  getProductQuantity: () => {},
  addOneToCart: () => {},
  removeOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

function CartProvider({ children }) {
  const [cartProducts, setCartProducts] = useState([]);
  const authContext = useContext(AuthContext);

  useEffect(() => {
    const fetchCartData = () => {
      const promises = cartProducts.map((cartItem) => {
        console.log(`Fetching data for cart item ID: ${cartItem.id}`);
        return getProductData(cartItem.id);
      });

      Promise.all(promises)
        .then((productDataArray) => {
          console.log("Product data for all items:", productDataArray);
          const updatedCart = cartProducts.map((cartItem, index) => ({
            ...cartItem,
            data: productDataArray[index],
          }));
          setCartProducts(updatedCart);
        })
        .catch((error) => console.error("Error fetching product data:", error));
    };

    fetchCartData();
  }, [authContext, cartProducts]);

  async function getProductData(id) {
    try {
      const response = await axios.get(`${API_URL}/api/products/${id}`);
      console.log(`Product data received for ID: ${id}`, response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching product data for id: ${id}`, error);
      return null;
    }
  }

  function getProductQuantity(id) {
    const quantity = cartProducts.find(
      (product) => product.id === id
    )?.quantity;

    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  }

  function addOneToCart(id) {
    const quantity = getProductQuantity(id);
    if (quantity === 0) {
      // product is not in cart
      setCartProducts([
        ...cartProducts,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartProducts(
        cartProducts.map((product) =>
          product.id === id
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      );
    }
  }

  function removeOneFromCart(id) {
    const quantity = getProductQuantity(id);

    if (quantity === 1) {
      deleteFromCart(id);
    } else {
      setCartProducts(
        cartProducts.map(
          (product) =>
            product.id === id // if condition
              ? { ...product, quantity: product.quantity - 1 } // if statement is true
              : product // if statement is false
        )
      );
    }
  }

  function deleteFromCart(id) {
    setCartProducts((cartProducts) =>
      cartProducts.filter((currentProduct) => {
        return currentProduct.id != id;
      })
    );
  }

  function getTotalCost() {
    let totalCost = 0;
    cartProducts.forEach((cartItem) => {
      const productData = getProductData(cartItem.id);
      totalCost += productData.price * cartItem.quantity;
    });
    return totalCost;
  }

  const contextValue = {
    items: cartProducts,
    getProductQuantity,
    addOneToCart,
    removeOneFromCart,
    deleteFromCart,
    getTotalCost,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export { CartProvider, CartContext };
