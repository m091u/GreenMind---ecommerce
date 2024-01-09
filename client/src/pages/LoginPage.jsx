import axios from "axios";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:4000";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  // const getUser = () => {
  //   const url = `${API_URL}/auth/login/success`;
  //   return axios
  //     .get(url, { withCredentials: true })
  //     .then(({ data }) => {
  //       setUser(data.user._json);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getUser();
  // }, []);

  /*  UPDATE - get authenticateUser from the context */
  const { storeToken, authenticateUser } = useContext(AuthContext);

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const requestBody = { email, password };

    axios
      .post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        // Save the token in the localStorage.
        storeToken(response.data.authToken);

        // Verify the token by sending a request
        // to the server's JWT validation endpoint.
        authenticateUser();
        console.log("authenticateUser called");
        navigate("/profile");
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
        console.error("Error during /verify request:", error);
      });
  };

  return (
    <div className="login">
      <h2 className= "loginHead">GreenMind</h2>

      <div className="card text-center">
        <div className="card-header">
          <b>
            <h5>Login</h5>
          </b>
        </div>

        <div className="card-body">
          <form onSubmit={handleLoginSubmit}>
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
              Login
            </button>

            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </form>
        </div>

        <div className="card-footer text-body-secondary">
        <p>Don't have an account yet? <br></br><Link to={"/signup"}>Sign Up</Link></p>

        </div>
      </div>

      {/* <p>Don't have an account yet? <Link to={"/signup"}>Sign Up</Link></p> */}
    </div>
  );
}

export default LoginPage;
