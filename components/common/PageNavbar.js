import {
  Dropdown,
  Image,
  Nav,
  Navbar,
  Container,
  NavDropdown,
} from "react-bootstrap";
import { useContext } from "react";
import authContext from "../../hooks/AuthContext/authContext";
import { getUserAvatar } from "../../utils";
import { faSignOutAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

function PageNavbar() {
  const { user, logout } = useContext(authContext);
  const navLinks = [
    { title: "Footfall Analysis", path: "/footfall" },
    { title: "Revenue Prediction", path: "/revenue" },
    { title: "Inventory Management", path: "/inventory" },
    { title: "Menu", path: "/menu" },
    { title: "How to use?", path: "/docs" },
  ];
  return (
    <Navbar collapseOnSelect expand="lg" style={{ backgroundColor: "#00395d" }}>
      <Container>
        <Link href="/" passHref>
          <Navbar.Brand style={{ color: "white" }}>
            <img
              alt=""
              src="/assets/images/logo.png"
              width="30"
              height="30"
              className="d-inline-block align-top mx-2 rounded-circle"
            />
            BARCLAYS | PRIME {user && <span>| {user?.environment}</span>}
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto"></Nav>
          <Nav>
            {user && (
              <NavDropdown
                title={
                  <div className="media d-flex">
                    <Image
                      src={getUserAvatar(user?.user_name, 30)}
                      className="user-avatar rounded-circle"
                    />
                    <div style={{ width: "5px" }}></div>
                    <div className="media-body align-items-center">
                      <span
                        className="my-0 font-small fw-semibold"
                        style={{ color: "white" }}
                      >
                        {user?.user_name ?? "Unknown"}
                      </span>
                    </div>
                  </div>
                }
                id="collasible-nav-dropdown"
              >
                {/* <NavDropdown.Item className="fw-semibold">
                  <Link href="/profile" passHref>
                    <Nav.Link className={`text-decoration-none text-dark`}>
                      <FontAwesomeIcon
                        icon={faUser}
                        className="text-dark me-2"
                        style={{ width: "20px" }}
                      />{" "}
                      Profile
                    </Nav.Link>
                  </Link>
                </NavDropdown.Item> */}
                <NavDropdown.Item className="fw-semibold" onClick={logout}>
                  <FontAwesomeIcon
                    icon={faSignOutAlt}
                    className="text-danger me-2"
                    style={{ width: "20px" }}
                  />{" "}
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            )}
            {/* {!user && (
              <Link href="/sign-in" passHref>
                <Nav.Link style={{ color: "white" }}>Login/Sign-Up</Nav.Link>
              </Link>
            )} */}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default PageNavbar;
