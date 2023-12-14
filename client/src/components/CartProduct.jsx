import Button from "react-bootstrap/Button";
import { useContext, useEffect } from "react";
import { CartContext } from "../context/cart.context";
import axios from "axios";

const API_URL = "http://localhost:4000";

function CartProduct(props) {
  const { id, quantity } = props;
  const cart = useContext(CartContext);

  const [productData, setProductData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}api/cart`, { productId, quantity: 1 })
      .then((response) => {
        setProductData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
      });
  }, [id]);

  if (!productData) {
    // Data is still being loaded
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3>{productData.title}</h3>
      <p>{quantity} total</p>
      <p>Euro {(quantity * productData.price).toFixed(2)}</p>
      <Button size="sm" onClick={() => cart.removeFromCart(id)}>
        Remove
      </Button>
      <hr></hr>
    </>
  );
}

export default CartProduct;
