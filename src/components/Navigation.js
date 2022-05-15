import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Navbar className="sticky-top ps-5" bg="dark" variant="dark">
            <Navbar.Brand as={Link} to="/">Loa Cardbook</Navbar.Brand>
            <Nav>
                <Nav.Link as={Link} to="/">성장</Nav.Link>
                <Nav.Link as={Link} to="/">세트</Nav.Link>
                <Nav.Link as={Link} to="/">도감</Nav.Link>
            </Nav>
        </Navbar>
    )
}

export default Navigation;