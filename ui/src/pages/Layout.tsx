import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import MyNavbar from "../components/Navbar";

const Layout = () => {
    return (
        <>
            <MyNavbar />
            <Container style={{ padding: "4rem" }}>
                <Outlet />
            </Container>
        </>
    );
};

export default Layout;
