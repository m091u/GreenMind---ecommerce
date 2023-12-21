// import Search from "../components/Search";
import banner from "../assets/Banner.svg";

function HomePage() {
  const products = [
    {
      name: "Monstera Deliciosa",
      image:
        "https://www.plantvine.com/plants/Monstera-deliciosa-7G-Main-1-819x1024.jpg",
      price: "€ 29.99",
    },
    {
      name: "Snake Plant",
      image:
        "https://www.plantvine.com/plants/Sansevieria-Laurentii-1G-819x1024.jpg",
      price: "€ 19.99",
    },
    {
      name: "Peace Lily",
      image: "https://www.plantvine.com/plants/Pablo-Peae-Lily-LArge.jpg",
      price: "€ 24.99",
    },
  ];
  return (

    <div className="homepage">
      <div className="bannerContainer">
        <img src={banner} alt="Banner" />
      </div>


      <div className="bestselling">
        <div className="bestsellinginfo">
          <h2>Best Selling Plants</h2>
          <p>Easiest way to buy your favourite plants</p>
          <button>See more</button>
        </div>

        <div className="product-details">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h5>{product.name}</h5>
                <p>{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="aboutus">
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

      <div className="customerfeedback">
        <h2>
          <b>What customers say about GREENMIND?</b>
        </h2>
      </div>
    </div>
  );
}

export default HomePage;
