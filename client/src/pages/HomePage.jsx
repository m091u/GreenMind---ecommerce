// import Search from "../components/Search";
import banner from "../assets/Banner.svg";
import aboutus from "../assets/About Us.svg";
import feedback1 from "../assets/Feedback1.svg";
import feedback2 from "../assets/feedback2.svg";
// import React from 'react';

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
          <h2>
            <b>Best Selling Plants</b>
          </h2>
          <p>Easiest way to buy your favourite plants</p>
          <button className="btn-custom">See more</button>
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
        <img src={aboutus} alt="information" />
      </div>

      <div className="customerfeedback">
        <h2 className="feedbackheading">
          <b>What customers say about GREENMIND?</b>
        </h2>

        <div
          id="carouselExampleControls"
          className="carousel slide"
          data-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img className="d-block w-100" src={feedback1} alt="First slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={feedback2} alt="Second slide" />
            </div>
            <div className="carousel-item">
              <img className="d-block w-100" src={feedback1} alt="Third slide" />
            </div>
          </div>
          <a
            className="carousel-control-prev"
            href="#carouselExampleControls"
            role="button"
            data-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Previous</span>
          </a>
          <a
            className="carousel-control-next"
            href="#carouselExampleControls"
            role="button"
            data-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="sr-only">Next</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
