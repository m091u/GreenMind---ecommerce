import Search from "../components/Search";
import banner from "../assets/Banner.svg";

function HomePage() {
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
    <div className="HomePage">
      <div
        className="bannerContainer"
        style={{ position: "relative", width: "100%", padding: "5%" }}
      >
        <img
          src={banner}
          alt="Banner"
          style={{ width: "100%", height: "auto" }}
        />
        <div
          style={{
            position: "relative",
            top: "50%",
            left: "50%",
            transform: "translate(-90%, -500%)",
            textAlign: "center",
            width: "70%",
          }}
        >
          <Search
            className="search-bar"
            filterSearchHandler={searchProductList}
          />
        </div>

        {/* Placeholder code to display search results */}

        <div className="bestselling">
          <h2> Best Selling Plants</h2>
          <p>Easiest way to healthy life of buying your favorite plants</p>
          <p>See More</p>
          {/* Photos */}
        </div>
        <div className="aboutUs">
          <h2>About us</h2>
          <p>Order now and appreciate the beauty of nature</p>
          <li>Large Assortment</li>
          <p>
            we offer many different types of products with fewer variations in
            each category.
          </p>
          <li>Fast & Free Shipping</li>
          <p>
            4-day or less delivery time, free shipping and an expedited delivery
            option.
          </p>
          <li>24/7 Support</li>
          <p>answers to any business related inquiry 24/7 and in real-time.</p>
        </div>
        <div className="categories">
          <h2>Categories</h2>
          <p>Find what you are looking for</p>
        </div>
        <div className="customerFeedback">
          <h2>What customers say about GREENMIND?</h2>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
