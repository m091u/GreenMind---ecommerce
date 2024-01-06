// import Search from "../components/Search";
import banner from "../assets/Banner.svg";
import aboutus from "../assets/About Us.svg";
import feedback1 from "../assets/Feedback1.svg";
import feedback2 from "../assets/feedback2.svg";
import { Link } from "react-router-dom";
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

        
        <Link to="/products">
          <button type="button" className="btn btn-dark">
            <b>Search</b>
          </button>
        </Link>
        
      </div>

      <div className="bestselling">
        <div className="bestsellinginfo">
          <h2>
            <b>Best Selling Plants</b>
          </h2>
          <p>Easiest way to buy your favourite plants</p>
          <Link to="/products">
            <button className="btn-custom">See more</button>
          </Link>
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

        <div id="carouselExample" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src={feedback1} className="d-block w-100" alt="feeback1" />
            </div>

            <div className="carousel-item">
              <img src={feedback2} className="d-block w-100" alt="feedback2" />
            </div>

            <div className="carousel-item">
              <img src={feedback1} className="d-block w-100" alt="feedback3" />
            </div>
          </div>

          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>

          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
