import { Navbar, Container, Nav, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

interface navbarPropsType {
    isLoggedIn: boolean;
    handleLogout: () => void;
}

const MyNavbar = ({ isLoggedIn, handleLogout }: navbarPropsType) => {
    return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Container>
                <Navbar.Brand href="/">Title</Navbar.Brand>
                <Navbar.Collapse className="justify-content-end">
                    <Nav>
                        {isLoggedIn && (
                            <>
                                <Nav.Link as={Link} to="/">
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link as={Link} to="/profile">
                                    Profile
                                </Nav.Link>
                                <Button
                                    variant="outline-danger"
                                    onClick={handleLogout}
                                >
                                    Logout
                                </Button>
                            </>
                        )}
                        {!isLoggedIn && (
                            <Nav.Link as={Link} to="/auth">
                                Login/Signup
                            </Nav.Link>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default MyNavbar;
