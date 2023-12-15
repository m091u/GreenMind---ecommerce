import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

function ProfilePage() {
  const [user, setUser] = useState();
  const [needsReloads, setNeedsReloads] = useState(true);
  const API_URL = "http://localhost:4005";
  const navigate = useNavigate();

  useEffect(() => {
    if (needsReloads) {
      // Make a request to get user details from the backend
      const storedToken = localStorage.getItem("authToken");

      axios
        .get(`${API_URL}/api/profile`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((response) => {
          const userData = response.data;
          setUser(userData);
        })
        .catch((error) => {
          console.error("Error fetching user details:", error);
        });
    }
  }, [needsReloads]);

  return (
    <>
      <h1>Here is your profile page</h1>

      <p>Orders</p>

      <p>Wishlist</p>
    </>
  );
}

export default ProfilePage;
