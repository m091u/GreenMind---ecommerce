import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";

const API_URL = "http://localhost:4000";

function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);
  // add sort filters
  return (
    <>
      <div className="explore-header">
        <h3>Explore our products</h3>
        <p>Enjoy our product catalogue ~~ to be changed</p>
      </div>

      <div>
        <p>PLACEHOLDER Add the search functionality from the Home page</p>
      </div>
      <div className="products-list">
        <h2>API data</h2>
        {products.map((product) => (
          // <div className="product-container" key={product._id}>
          //   <ProductCard {...product} />
          // </div>
          <div key={product.id} className="product-container">
            <img src={product.image} alt={product.name} />
            <p> Product name: {product.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
