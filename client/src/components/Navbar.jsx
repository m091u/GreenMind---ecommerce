import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import {
  Button,
  Container,
  Navbar,
  Nav,
  Modal,
  Offcanvas,
} from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import CartProduct from "./CartProduct";
import ModalComponent from "./ModalComponent";
import { AuthContext } from "../context/auth.context";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Update products count when the cart changes
    setProductsCount(cart.cartProducts.length);

     // Open the off-canvas when a product is added to the cart
     if (cart.cartProducts.length > 0 && !window.location.pathname.includes("/cart")) {
      setShow(true);
    }
  }, [cart.cartProducts]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewCart = () => {
    handleClose(); // Close the offcanvas
    navigate("/cart"); 
  };

  // const authContextValue = useContext(AuthContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar
        sticky="top"
        expand="sm"
        className="justify-content-between bg-white shadow-sm mb-3"
      >
        <Container>
          <Navbar.Brand href="/">GREENMIND</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/" className="nav-button">
                Home
              </Nav.Link>
              <Nav.Link as={Link} to="/products" className="nav-button">
                Products
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>

          <Nav className="ml-auto d-flex flex-row gap-3">
            {isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/profile">
                  <i className="fas fa-user"></i>
                  <span> {user.name}</span>
                </Nav.Link>

                <Button onClick={logOutUser}>Logout</Button>
              </>
            )}
            {!isLoggedIn && (
              <>
                <Nav.Link as={Link} to="/login">
                  <i className="fas fa-user"></i>
                  <span> Login</span>
                </Nav.Link>
              </>
            )}

            <Button
              onClick={handleShow}
              style={{
                width: "2.8rem",
                height: "2.8rem",
                position: "relative",
                border: "none",
                background: "none",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
                fill="#000000a6"
              >
                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
              </svg>

              <div
                className="rounded-circle d-flex justify-content-center align-items-center"
                style={{
                  color: "white",
                  backgroundColor: "#c2a18a",
                  width: "1.5rem",
                  height: "1.5rem",
                  position: "absolute",
                  top: -5,
                  right: -5,
                }}
              >
                {productsCount}
              </div>
            </Button>
          </Nav>
        </Container>
      </Navbar>

      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Shopping Cart Summary</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {cart.cartProducts.length > 0 ? (
            <>
              <div>
                {cart.cartProducts.map((currentProduct, idx) => (
                  <ModalComponent
                    key={idx}
                    id={currentProduct.id}
                    quantity={currentProduct.quantity}
                  ></ModalComponent>
                ))}
              </div>
              <div className="modal-buttons">
                <Link to="/cart">
                  <Button onClick={handleViewCart}>View cart</Button>
                </Link>
                <Button >Checkout</Button>
              </div>
            </>
          ) : (
            <h4>Your cart is empty!</h4>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default NavbarComponent;