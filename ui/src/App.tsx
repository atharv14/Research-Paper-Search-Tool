import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Dashbaord from "./pages/Dashboard";
import Layout from "./pages/Layout";
import Project from "./pages/Project";
import NoPage from "./pages/NoPage";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Query from "./pages/Query";

const App = () => {
    return (
        <Container className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Dashbaord />} />
                        <Route path="project" element={<Project />} />
                        <Route path="query" element={<Query />} />
                        <Route path="profile" element={<Profile />} />
                        <Route path="auth" element={<Auth />} />
                        <Route path="*" element={<NoPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </Container>
    );
};

export default App;
