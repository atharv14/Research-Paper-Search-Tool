import { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProject } from "../api/project";
import { getQueries } from "../api/query";
import { projectType, querySetType } from "../api/types";
import QueryAccordian from "../components/QueryAccordian";

const Project = () => {
    const [project, setProject] = useState<projectType>();
    const [queries, setQueries] = useState<querySetType>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    const fetchProject = (id: number) => {
        setIsLoading(true);
        getProject(id)
            .then((data) => setProject(data))
            .then(() => {
                fetchQueries(id);
            })
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchQueries = (pId: number) => {
        setIsLoading(true);
        getQueries(pId)
            .then((data) => setQueries(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0");
        if (id === 0) navigate("/"); // send to dashboard if no id in url
        fetchProject(id);
        setTimeout(() => fetchQueries(id), 1000); // TODO: Clean this shit
    }, []);

    return (
        <Container className="project-page">
            {!isLoading ? (
                <>
                    <Row className="project-head justify-content-between">
                        <Col xs="11">
                            <h2>{project?.projectName}</h2>
                        </Col>
                        <Col>
                            <FiSettings
                                className="cursor-pointer"
                                size={"1.5em"}
                            />
                        </Col>
                    </Row>
                    <Container className="query-section">
                        <QueryAccordian
                            initialQueries={queries}
                            projectId={parseInt(searchParams.get("id") || "0")}
                        />
                    </Container>
                </>
            ) : (
                <Spinner />
            )}
        </Container>
    );
};

export default Project;
