import axios from "axios";
import { useState, useContext, useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:4000";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const [user, setUser] = useState(null);

  const navigate = useNavigate();

  const getUser = () => {
    const url = `${API_URL}/auth/login/success`;
    return axios
      .get(url, { withCredentials: true })
      .then(({ data }) => {
        setUser(data.user._json);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

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
      navigate("/products");
    })
    .catch((error) => {
      const errorDescription = error.response.data.message;
      setErrorMessage(errorDescription);
    });
  };
  
  const googleAuth = () => {
    window.open(`${API_URL}/auth/google/callback`, "_self");
  };
  
  return (
    <div className="login">
      <h2>GreenMind</h2>
      <h3>Login</h3>

      <form onSubmit={handleLoginSubmit}>
        <label></label>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmail}
        />

        <label></label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePassword}
        />

        <button type="submit">Login</button>
        <p> or </p>
        <button onClick={googleAuth}>
          <img src="./images/google.png" />
          <span>Sign in with Google</span>
        </button>
      </form>

      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <p>Don't have an account yet?</p>
      <Link to={"/signup"}> Sign Up</Link>
    </div>
  );
}

export default LoginPage;
