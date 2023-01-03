import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import './Header.css'

function Header() {

  const navigate = useNavigate();

  return (
    <Navbar collapseOnSelect expand="md" bg="dark" variant="dark">
      <Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={() => navigate('/')}><span className="nav-text">Home</span></Nav.Link>
            <Nav.Link onClick={() => navigate('/repairs')}><span className="nav-text">Repairs</span></Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link onClick={() => navigate('/login')}><span className="nav-text">Login</span></Nav.Link>
            <Nav.Link onClick={() => navigate('/register')}>
            <span className="nav-text">Register</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
