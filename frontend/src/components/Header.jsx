import React, { useState } from "react";
import Container from "react-bootstrap/Container";
import { LinkContainer } from "react-router-bootstrap";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import logo from "../assets/logo.png";

const Header = () => {
  const [authToken, setAuthToken] = useState(false);
  // setAuthToken(false);
  return (
    <>
      <Navbar bg="white" expand="lg">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={logo}
                className="header-logo"
                style={{
                  maxWidth: "150px",
                  maxHeight: "60px",
                  width: "auto",
                  height: "auto",
                }}
                alt="ProShop"
              />
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              <Nav.Link href="#home">Destination</Nav.Link>
              <Nav.Link href="#link">Experiences</Nav.Link>
              <Nav.Link href="#link">Special Offers</Nav.Link>
              {authToken ? (
                <Nav.Link href="#link">Log In</Nav.Link>
              ) : (
                <Nav.Link href="#link">Sign Up</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
