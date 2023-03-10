import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { getProject } from "../api/project";
import { projectType, queryType } from "../api/types";
import QueryAccordian from "../components/QueryAccordian";
import ResultSetAccordian from "../components/ResultAccordian";

const Project = () => {
    const [project, setProject] = useState<projectType>();
    const [queries, setQueries] = useState<queryType[]>([]);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0"); // if no id passsed request for undefined id. TODO:Handle better
        const projectData = getProject(id);
        setProject(projectData);
        setQueries(projectData?.queries ?? []);
    }, []);
    const removeQuery = (qId: number) => {
        const updatedQueries = queries.filter(({ id }) => id !== qId);
        setQueries(updatedQueries ?? queries);
    };
    const addQuery = () => {
        const newId = queries.length
            ? queries[queries.length - 1]["id"] + 1
            : 0;
        let newQuery: queryType = {
            id: newId,
            name: "New Query",
            results: [],
            source: "MANUAL",
            text: "",
        };
        setQueries([...queries, newQuery]);
    };
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
                <Button onClick={addQuery}>Add Query</Button>
                <QueryAccordian queries={queries} removeQuery={removeQuery} />
            </Container>
            <Container className="result-section">
                <ResultSetAccordian queries={queries} />
            </Container>
        </Container>
    );
};

export default Project;
