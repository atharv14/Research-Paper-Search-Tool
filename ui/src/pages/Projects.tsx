import { Col, Container, Row } from "react-bootstrap";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
    return (
        <Container className="projects-page">
            <h3>Projects</h3>
            <Container className="project-cards-wrapper">
                <Row xs={1} md={3}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Col>
                            <ProjectCard key={i} />
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Projects;
