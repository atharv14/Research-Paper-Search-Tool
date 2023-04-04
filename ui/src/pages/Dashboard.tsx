import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../api/project";
import { useEffect, useState } from "react";
import { projectType } from "../api/types";
import { isUserLoggedIn } from "../api/utility";
import NewPorjectModal from "../components/NewPorjectModal";
const Dashbaord = () => {
    const [projects, setProjects] = useState<projectType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [showNewProjectModal, setShowNewProjectModal] = useState(false);
    const navigate = useNavigate();

    const saveProject = (name: string, description: string) => {
        console.log(name, description);
    };

    const fetchProjects = () => {
        getProjects()
            .then((data) => setProjects(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (!isUserLoggedIn()) {
            navigate("/auth");
            return;
        }
        fetchProjects();
    }, []);

    return (
        <Container className="dashboard-page">
            <Container className="p-4">
                <Row className="justify-content-between">
                    <Col md={2}>
                        <h3>Projects</h3>
                    </Col>
                    <Col md={2}>
                        <Button
                            variant="success"
                            onClick={() => setShowNewProjectModal(true)}
                        >
                            Create New
                        </Button>
                    </Col>
                </Row>
            </Container>
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
            <NewPorjectModal
                show={showNewProjectModal}
                handleClose={() => setShowNewProjectModal(false)}
                saveProject={saveProject}
            />
        </Container>
    );
};

export default Dashbaord;
