import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import images from "../assets/images.png";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaSignOutAlt,
  FaSignInAlt,
  FaRegistered,
} from "react-icons/fa";
import { logout } from "../slices/authSlice";
import { useLogoutMutation } from "../slices/userApiSlice";
import { removeRoom } from "../slices/roomSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [logoutApiCall] = useLogoutMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(removeRoom());
      dispatch(logout());
      navigate("/");
      // NOTE: here we need to reset cart state for when a user logs out so the next
      // user doesn't inherit the previous users cart and shipping
      // dispatch(resetCart());
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      <Navbar bg="white" expand="lg" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src={images}
                className="header-logo"
                style={{
                  maxWidth: "150px",
                  maxHeight: "60px",
                  width: "auto",
                  height: "auto",
                }}
                alt="The Hotel"
              />
              {"  "}
              {/* <span className="eb-garamond">The Villa</span> */}
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto ">
              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>
                        <FaUser /> Profile
                      </NavDropdown.Item>
                    </LinkContainer>
                    <NavDropdown.Item onClick={logoutHandler}>
                      <FaSignOutAlt /> Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                </>
              ) : (
                // <Nav.Link href="#link"></Nav.Link>
                <>
                  <LinkContainer to="/login">
                    <Nav.Link>
                      <FaSignInAlt /> Log In
                    </Nav.Link>
                  </LinkContainer>
                  <LinkContainer to="/signup">
                    <Nav.Link>
                      <FaRegistered /> Sign Up
                    </Nav.Link>
                  </LinkContainer>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
