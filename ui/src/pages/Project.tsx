import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { getProject } from "../api/project";
import { projectType } from "../api/types";
import QueryAccordian from "../components/QueryAccordian";
import ResultSetAccordian from "../components/ResultAccordian";

const Project = () => {
    const [project, setProject] = useState<projectType>();

    const [searchParams] = useSearchParams();
    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0"); // if no id passsed request for undefined id. TODO:Handle better
        const projectData = getProject(id);
        setProject(projectData);
    }, []);

    return (
        <Container className="project-page">
            <Row className="project-head justify-content-between">
                <Col xs="11">
                    <h2>{project?.name}</h2>
                </Col>
                <Col>
                    <FiSettings className="cursor-pointer" size={"1.5em"} />
                </Col>
            </Row>
            <Container className="query-section">
                <QueryAccordian />
            </Container>
            <Container className="result-section">
                {/* <ResultSetAccordian queries={queries} /> */}
            </Container>
        </Container>
    );
};

export default Project;
