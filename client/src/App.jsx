// import { useState } from "react";
import "./App.css";
import "@fortawesome/fontawesome-free/css/all.css";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";

function App() {
  // const [count, setCount] = useState(0);

  return (
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage/>}>

          </Route>
        </Routes>
        {/* <h1>eCommerce Page</h1>
        <p className="read-the-docstest">Team project Maddy & Mira</p> */}
        <Footer />
      </div>
  );
}

export default App;
