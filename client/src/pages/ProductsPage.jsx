import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { useContext } from "react";

const API_URL = "http://localhost:4000";

function ProductsPage() {

    // add sort filters
  return (
    <>
      <div className="explore-header">
        <h3>Explore our products</h3>
        <p>Enjoy our product catalogue ~~ to be changed</p>
      </div>

      <div>
        <p>dd the search functionality from the Home page</p>A
      </div>
      <div className="products-list">
        {products.map((product) => (
          <div className="product-container" key={product._id}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </>
  );
}

export default ProductsPage;