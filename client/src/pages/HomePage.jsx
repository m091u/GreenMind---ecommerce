// import Search from "../components/Search";
import banner from "../assets/Banner.svg";
import aboutus from "../assets/About Us.svg";
import feedback1 from "../assets/Feedback1.svg";
import { Link } from "react-router-dom";


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

        <Link to="/products">
          <button type="button" className="btn btn-dark">
            <b>Shop Now</b>
          </button>
        </Link>
      </div>

      <div className="bestselling">
        <div className="bestsellinginfo">
          <h2>
            <b>Best Selling Plants</b>
          </h2>
          <h6>Easiest way to buy your favourite plants</h6>
          <Link to="/products">
            <button className="btn-custom"><b>See more</b></button>
          </Link>
        </div>

        <div className="product-details">
          {products.map((product, index) => (
            <div key={index} className="product-item">
              <img src={product.image} alt={product.name} />
              <div className="product-info">
                <h5>{product.name}</h5>
                <h5>{product.price}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="aboutus">
        <img src={aboutus} alt="information" />
      </div>

      <div className="customerfeedback">
        <h2 className="feedbackheading">
          <b>What customers say about GREENMIND?</b>
        </h2>

        <div
          id="carouselExampleSlidesOnly"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                src={feedback1}
                className="d-block w-100"
                alt="Feedback 1"
              />
            </div>
            <div className="carousel-item">
              <img
                src={feedback1}
                className="d-block w-100"
                alt="Feedback 2"
              />
            </div>
            <div className="carousel-item">
              <img
                src={feedback1}
                className="d-block w-100"
                alt="Feedback 3"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export default HomePage;
