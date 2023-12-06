import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

const API_URL = "http://localhost:4000";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        console.log("data from server:", response.data);

        setProducts(response.data);
        setFilteredProducts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);

  // add sort filters

  //search
  const searchProductList = (char) => {
    let filtered;
    if (char === "") {
      setFilteredProducts(products);
    } else {
      filtered = products.filter((eachProduct) => {
        return eachProduct.name.toLowerCase().includes(char.toLowerCase());
      });
      setFilteredProducts(filtered);
    }
  };

  return (
    <>
      <div className="explore-header">
        <h3>Explore our products</h3>
        <p>Enjoy our product catalogue **to be changed**</p>
      </div>
      <div>
        <Search
          className="search-bar"
          filterSearchHandler={searchProductList}
        />

        <h4>***Placeholder for product filters***</h4>
      </div>
      
      <div className="products-list">
        {filteredProducts.map((product) => (
          <div className="product-container" key={product._id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
