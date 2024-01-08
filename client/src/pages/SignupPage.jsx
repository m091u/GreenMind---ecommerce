import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:4000";

function SignupPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);

  const navigate = useNavigate();

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);
  const handleName = (e) => setName(e.target.value);

  const handleSignupSubmit = (e) => {
    e.preventDefault();

    const requestBody = { email, password, name };

    // Make an axios request to the API
    // If the POST request is a successful redirect to the login page
    // If the request resolves with an error, set the error message in the state
    axios
      .post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate("/login");
      })
      .catch((error) => {
        const errorDescription =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          "An error occurred";
        setErrorMessage(errorDescription);
      });
  };

  return (
    <div className="signup">
      <h2 className="loginHead">GREENMIND</h2>

      <div className="card text-center">
        <div className="card-header">
          <b>
            <h5>Create an account</h5>
          </b>
        </div>

        <div className="card-body">
          <form onSubmit={handleSignupSubmit}>
            <p className="card-title">
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Name"
                value={name}
                onChange={handleName}
              />
            </p>

            <p className="card-title">
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={handleEmail}
              />
            </p>

            <p className="card-title">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={handlePassword}
              />
            </p>

            <button type="submit" className="btn btn-primary">
              Sign Up
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>

        <div className="card-footer text-body-secondary">
          <p>
            Already have an account? <br></br>
            <Link to={"/login"}>Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
