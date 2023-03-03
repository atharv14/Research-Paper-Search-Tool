import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../api/project";
import { useEffect, useState } from "react";
import { projectType } from "../api/types";
const Dashbaord = () => {
    const [projects, setProjects] = useState<projectType[]>([]);
    useEffect(() => {
        const projectsData = getProjects();
        setProjects(projectsData);
    }, []);

    return (
        <Container className="dashboard-page">
            <h3>Projects</h3>
            <Container className="project-cards-wrapper">
                <Row xs={1} md={3}>
                    {projects.map((proj, i) => (
                        <Col key={i}>
                            <Link
                                to={`/project/?id=${proj.id}`}
                                style={{ textDecoration: "none" }}
                            >
                                {" "}
                                <ProjectCard
                                    key={proj.id}
                                    name={proj.name}
                                    desc={proj.desc}
                                />
                            </Link>
                        </Col>
                    ))}
                </Row>
            </Container>
        </Container>
    );
};

export default Dashbaord;
