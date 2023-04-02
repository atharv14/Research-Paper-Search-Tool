import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../api/project";
import { useEffect, useState } from "react";
import { projectType } from "../api/types";
const Dashbaord = () => {
    const [projects, setProjects] = useState<projectType[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    const fetchProjects = () => {
        getProjects()
            .then((data) => setProjects(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(fetchProjects, []);

    return (
        <Container className="dashboard-page">
            <h3>Projects</h3>
            <Container className="project-cards-wrapper">
                {!isLoading ? (
                    <Row xs={1} md={3}>
                        {projects.map((proj, i) => (
                            <Col key={i}>
                                <Link
                                    to={`/project/?id=${proj.projectId}`}
                                    style={{ textDecoration: "none" }}
                                >
                                    {" "}
                                    <ProjectCard
                                        key={proj.projectId}
                                        name={proj.projectName}
                                        desc={proj.description}
                                    />
                                </Link>
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <Spinner />
                )}
            </Container>
        </Container>
    );
};

export default Dashbaord;
