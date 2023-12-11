import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import { AuthContext } from "../context/auth.context";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const authContextValue = useContext(AuthContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar expand="lg" className="justify-content-between">
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
          {/* <Navbar.Toggle /> */}
          <Nav className="ml-auto d-flex flex-row gap-3">
            <Nav.Link as={Link} to="/login">
              <i className="fas fa-user"></i>
              <span> Profile</span>
            </Nav.Link>
            <Nav.Link onClick={handleShow} className="nav-button">
              <i className="fas fa-shopping-cart"></i>
              <span> Cart 0</span>
            </Nav.Link>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your cart is empty</p>
          <button>Proceed to payment</button>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
