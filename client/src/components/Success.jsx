import React from "react";
import plant from "../assets/succulent.png"
import { Link } from "react-router-dom";

const Success = () => {
  return (
    <div className="d-flex justify-content-center text-center mb-5">
      <div>
        <h1 className="mb-4 mt-5 text-success">Payment successful!</h1>
        <p className="mb-4 mt-5 fs-5">
          Your order is in our system and will be delivered soon. <br/>Keep an eye on shipment updates from <span className="fs-4">GREENMIND</span>.
        </p>
        <div className="mb-4">
          <img src={plant} alt="plant logo" width={250}/>
        </div>
        <div>
          <Link to="/" className="underline text-xl underline-offset-4">
            Back to Home Page
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Success;
