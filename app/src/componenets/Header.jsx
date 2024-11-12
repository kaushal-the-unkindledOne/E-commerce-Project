import { Button, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import toast from "react-hot-toast";
import logo from "../images/logo.png";
import "../styles/Header.css";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { CartData } from "../context/CartContext";

const Header = ({ isAuth }) => {
  const navigate = useNavigate();
  const { setUser, setIsAuth } = UserData();
  const { totalItem } = CartData();

  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged Out");
  };

  return (
    <Navbar expand="lg" className="header-zigzag">
      <Container
        fluid
        style={{
          maxWidth: "1200px",
          paddingLeft: "2rem",
          paddingRight: "2rem",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Navbar.Brand
          className="d-flex align-items-center"
          style={{ gap: "1rem" }}
        >
          <img
            src={logo}
            alt="Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/" className="nav-link-custom">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/products" className="nav-link-custom">
              Products
            </Nav.Link>
            {isAuth && (
              <Nav.Link as={Link} to="/account" className="nav-link-custom">
                Account
              </Nav.Link>
            )}
          </Nav>

          {isAuth && (
            <Button
              variant="success"
              className="mx-2"
              style={{ fontSize: "20px" }}
              onClick={() => navigate("/cart")}
            >
              <AiOutlineShoppingCart />{" "}
              <span
                style={{
                  background: "red",
                  padding: "3px",
                  borderRadius: "50%",
                }}
              >
                {totalItem}
              </span>
            </Button>
          )}

          {isAuth ? (
            <Button onClick={logoutHandler} variant="danger">
              Logout
            </Button>
          ) : (
            <Button onClick={() => navigate("/login")} variant="success">
              Login
            </Button>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
