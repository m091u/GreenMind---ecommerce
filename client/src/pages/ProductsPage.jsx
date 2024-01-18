import { useState, useEffect } from "react";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import Search from "../components/Search";

// const API_URL = "http://localhost:4000";
// deploy link
const API_URL = "https://greenmind-6dox.onrender.com";

function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedAvailability, setSelectedAvailability] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/products`)
      .then((response) => {
        setProducts(response.data);
        setFilteredProducts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error.message);
      });
  }, []);

  // Filters
  // Price sort
  const sortPriceLowHigh = () => {
    const sortedPrice = [...products].sort((a, b) => a.price - b.price);
    setFilteredProducts(sortedPrice);
  };

  const sortPriceHighLow = () => {
    const sortedPrice = [...products].sort((a, b) => b.price - a.price);
    setFilteredProducts(sortedPrice);
  };

  const handleSortChange = (event) => {
    const selectedSortOrder = event.target.value;
    setSortOrder(selectedSortOrder);

    if (selectedSortOrder === "lowToHigh") {
      sortPriceLowHigh();
    } else if (selectedSortOrder === "highToLow") {
      sortPriceHighLow();
    }
  };

  // Category filter
  const handleOptionSelect = (event) => {
    const selectedCategory = event.target.value;
    setSelectedCategory(selectedCategory);

    if (selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((eachProduct) => {
        return eachProduct.category.includes(selectedCategory);
      });
      setFilteredProducts(filtered);
    }
  };

  //In Stock filter
  const handleStockSelect = (event) => {
    const selectedAvailability = event.target.value;
    setSelectedAvailability(selectedAvailability);

    if (selectedAvailability === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((eachProduct) => {
        return (
          (selectedAvailability === "inStock" &&
            eachProduct.inStock === true) ||
          (selectedAvailability === "outOfStock" &&
            eachProduct.inStock === false)
        );
      });
      setFilteredProducts(filtered);
    }
  };

  //Search
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

  if (loading) {
    return <p>Loading plants &#127807 onto our virtual shelves...</p>;
  } else {
    return (
      <>
        <div className="explore-header">
          <div>
            <Search
              className="search-bar"
              filterSearchHandler={searchProductList}
            />
          </div>
        </div>

        <div className="filters">
          <select
            className="price-select"
            value={sortOrder}
            onChange={handleSortChange}
          >
            <option value="default">Sort Price</option>
            <option value="lowToHigh">Low to High</option>
            <option value="highToLow">High to Low</option>
          </select>

          <select
            className="category-select"
            value={selectedCategory}
            onChange={handleOptionSelect}
          >
            <option value="">All Categories</option>
            <option value="Air Purifying">Air Purifying</option>
            <option value="Indoor">Indoor</option>
            <option value="Low Light">Low Light</option>
            <option value="Low Maintenance">Low Maintenance</option>
            <option value="Outdoor">Outdoor</option>
            <option value="Pet Friendly">Pet Friendly</option>
            <option value="Statement Plant">Statement Plant</option>
            <option value="Trailing Plant">Trailing Plant</option>
            <option value="Unique Foliage">Unique Foliage</option>
          </select>

          <select
            className="availability-select"
            value={selectedAvailability}
            onChange={handleStockSelect}
          >
            <option value="">Availability</option>
            <option value="inStock">In Stock</option>
            <option value="outOfStock">Out of Stock</option>
          </select>
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
}

export default ProductsPage;
