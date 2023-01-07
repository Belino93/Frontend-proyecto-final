import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "./Header.css";

function Header() {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  if (localStorage.getItem("token") && localStorage.getItem("user")) {
    const user = JSON.parse(localStorage.getItem("user"));
    return (
      <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
            <span className="brand-text">
              <span className="brand-slice">Fix</span>App
            </span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/")}>
                <span className="nav-text">Home</span>
              </Nav.Link>
              <Nav.Link onClick={() => navigate("/repairs")}>
                <span className="nav-text">Repairs</span>
              </Nav.Link>
              {user?.role_id === 2 && (
                <Nav.Link onClick={() => navigate("/admin")}>
                  <span className="nav-text">Admin</span>
                </Nav.Link>
              )}
            </Nav>
            <Nav>
              <Nav.Link onClick={() => navigate("/profile")}>
                <span className="nav-text">{user.name}</span>
              </Nav.Link>
              <Nav.Link onClick={() => logout()}>
                <span className="nav-text">Logout</span>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <span className="brand-text">
            <span className="brand-slice">Fix</span>App
          </span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate("/")}>
              <span className="nav-text">Home</span>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/repairs")}>
              <span className="nav-text">Repairs</span>
            </Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate("/login")}>
              <span className="nav-text">Login</span>
            </Nav.Link>
            <Nav.Link onClick={() => navigate("/register")}>
              <span className="nav-text">Register</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
