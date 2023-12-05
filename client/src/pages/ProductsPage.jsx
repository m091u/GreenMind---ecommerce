import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import Search from "../components/Search";

const API_URL = "http://localhost:4000";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
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
        <p>Enjoy our product catalogue ~~ to be changed</p>
      </div>
      <div>
        <Search
          className="search-bar"
          filterSearchHandler={searchProductList}
        />
      </div>
      <hr></hr>
      <div className="products-list">
        <h2>API data</h2>
        {filteredProducts.map((product) => (
          //with ProductCard
          // <div className="product-container" key={product._id}>
          //   <ProductCard {...product} />
          // </div>

          //without Product Card
          <div key={product.name} className="product-container">
            <img src={product.image} alt={product.name} />
            <p> Product name: {product.name}</p>
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;
