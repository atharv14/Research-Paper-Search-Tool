import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
const MyNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">Title</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        <Nav.Link as={Link} to="/">
                            Dashboard
                        </Nav.Link>
                        <Nav.Link as={Link} to="/profile">
                            Profile
                        </Nav.Link>
                        <Nav.Link as={Link} to="/auth">
                            Login/Signup
                        </Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
