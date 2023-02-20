import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

const Dashbaord = () => {
    return (
        <Container className="projects-page">
            <h3>Projects</h3>
            <Container className="project-cards-wrapper">
                <Row xs={1} md={3}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Col>
                            <Link
                                to="/project"
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                <ProjectCard key={i} />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Dashbaord;
