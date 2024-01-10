import { useState, useEffect } from "react";
import axios from "axios";
// import { Link, useNavigate, useParams } from "react-router-dom";

function ProfilePage() {
  const API_URL = "http://localhost:4000";
  const [profile, setProfile] = useState([]);

  const getProfile = () => {
    const storedToken = localStorage.getItem("authToken");
    console.log("StoredToken", storedToken);

    axios
      .get(`${API_URL}/api/profile`, {
        headers: { Authorization: `Bearer ${storedToken}` },
      })
      .then((response) => setProfile(response.data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getProfile();
  }, []);
  console.log("Profile", profile)

  return (
    <div className='profileContainer'>
      <h1>Here is your profile page</h1>
      <hr></hr>
      <p>Orders</p>

      <p>Wishlist</p>
    </div>
  );
}

export default ProfilePage;
