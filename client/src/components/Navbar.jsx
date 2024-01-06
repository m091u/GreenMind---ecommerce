import { Link, useNavigate } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { Button, Container, Navbar, Nav, Modal } from "react-bootstrap";
import { CartContext } from "../context/cart.context";
import CartProduct from "./CartProduct";
import ModalComponent from "./ModalComponent"
import { AuthContext } from "../context/auth.context";

function NavbarComponent() {
  const cart = useContext(CartContext);

  const [show, setShow] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    // Update products count when the cart changes
    setProductsCount(cart.cartProducts.length);
  }, [cart.cartProducts]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleViewCart = () => {
    handleClose(); // Close the modal
    navigate("/cart"); // Navigate to the /cart route
  };

  // const authContextValue = useContext(AuthContext);
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar
        expand="xl"
        className="justify-content-between bg-white sticky-top border-bottom"
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
                  <span>  {user.name}</span>
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

            <Nav.Link onClick={handleShow} className="nav-button">
              <i className="fas fa-shopping-cart"></i>
              <span> Cart {productsCount}</span>
            </Nav.Link>
          </Nav>
          {/* </Navbar.Collapse> */}
        </Container>
      </Navbar>

      <Modal show={show} onHide={handleClose} dialogClassName="modal-right">
        <Modal.Header closeButton>
          <Modal.Title>Shopping Cart Summary</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cart.cartProducts.length > 0 ? (
            <>
              <p> Items in your cart:</p>
              {cart.cartProducts.map((currentProduct, idx) => (
                <CartProduct
                  key={idx}
                  id={currentProduct.id}
                  quantity={currentProduct.quantity}
                ></CartProduct>
              ))}
              <h1>Total: {cart.getTotalCost().toFixed(2)}</h1>
              <Button variant="success" >
                Checkout
              </Button>
              <Button>View cart</Button>
            </>
          ) : (
            <h4>Your cart is empty!</h4>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}

export default NavbarComponent;
