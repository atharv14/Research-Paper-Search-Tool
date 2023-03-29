import { useEffect, useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useSearchParams } from "react-router-dom";
import { getProject } from "../api/project";
import { search } from "../api/search";
import { projectType, queryType, resultType } from "../api/types";
import QueryAccordian from "../components/QueryAccordian";
import ResultSetAccordian from "../components/ResultAccordian";

const Project = () => {
    const [project, setProject] = useState<projectType>();
    const [queries, setQueries] = useState<queryType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0"); // if no id passsed request for undefined id. TODO:Handle better
        const projectData = getProject(id);
        setProject(projectData);
        setQueries(projectData?.queries ?? []);
    }, []);

    const searchQuery = (id: number) => {
        const datasource = (
            document.getElementById("source_" + id) as HTMLInputElement
        )?.value;
        const queryText = (
            document.getElementById("query_" + id) as HTMLInputElement
        )?.innerText.slice(1, -1); // removing outermost brackets
        setIsLoading(true);
        search({ datasource, queryText })
            .then((data) => {
                let updatedQueries = [...queries];
                updatedQueries.forEach((q, i) => {
                    if (q.id == id)
                        updatedQueries[i] = {
                            ...updatedQueries[i],
                            results: data,
                        };
                });
                setQueries(updatedQueries);
            })
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

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
            source: "ieee",
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
                <QueryAccordian
                    isLoading={isLoading}
                    queries={queries}
                    searchQuery={searchQuery}
                    removeQuery={removeQuery}
                />
            </Container>
            <Container className="result-section">
                <ResultSetAccordian queries={queries} />
            </Container>
        </Container>
    );
};

export default Project;
