import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/cart.context";

const API_URL = "http://localhost:4000";

function ProductDetailsPage(props) {
  const navigate = useNavigate();
  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { productId } = useParams();

  const cart = useContext(CartContext);

  const getProduct = () => {
    axios
      .get(`${API_URL}/api/products/${productId}`)
      .then((response) => {
        const oneProduct = response.data;
        setProduct(oneProduct);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleIncreaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleAddToCart = () => {

    const productToAdd = {
      id: productId,
      quantity: quantity,
    }
    cart.addOneToCart(productToAdd);
     console.log("clicked")
    // Navigate to the cart page
    // navigate("/cart");
  };

  return (
    <>
      <div className="product-page">
        <div className="pages-links">
          <Link to="/products">
            <button>View All Plants</button>
          </Link>
        </div>

        <div className="product-details">
          <div className="product-image">
            <img src={product.imageUrl} className="rounded-image" />
          </div>
          <div className="product-info">
            <h2>{product.name}</h2>
            <p>
              <strong>€ {product.price}</strong>
            </p>
            <hr></hr>
            <p>{product.description}</p>
            <p>
              <strong>Category:</strong>{" "}
              {Array.isArray(product.category)
                ? product.category.join(", ")
                : product.category}
            </p>
            <p> {product.inStock ? "In Stock" : "Out of Stock"}</p>
            <div>
              <div className="cart-adding">
                <div className="quantity-section">
                  <button onClick={handleDecreaseQuantity}>-</button>
                  <span>{quantity}</span>
                  <button onClick={handleIncreaseQuantity}>+</button>
                </div>
                <button className="cart-add" onClick={handleAddToCart}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetailsPage;
