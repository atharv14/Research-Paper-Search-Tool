import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Dashbaord from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Projects from "./pages/Projects";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";

const App = () => {
    return (
        <Container className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashbaord />} />
                        <Route path="projects" element={<Projects />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
};

export default App;
