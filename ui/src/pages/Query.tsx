import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import { getProjects, postProject } from "../api/project";
import { useEffect, useState } from "react";
import { projectType, queryType } from "../api/types";
import { isUserLoggedIn } from "../api/utility";
import NewPorjectModal from "../components/NewPorjectModal";
const dummyQuery: queryType = {
    queryId: 0,
    searchText: "",
    searchResults: {},
};
const Query = () => {
    const [query, setQuery] = useState<queryType>(dummyQuery);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fetchQuery = (id: number) => {
        // getProjects()
        //     .then((data) => setProjects(data))
        //     .catch((e) => {
        //         alert("Something went wrong");
        //         console.log(e);
        //     })
        //     .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0");
        if (id === 0) navigate("/"); // send to dashboard if no id in url
        fetchQuery(id);
    }, []);

    return (
        <Container className="query-page">
            <Container className="p-4">
                <Row className="justify-content-between">
                    <Col md={4}>
                        <h3>Query Report</h3>
                    </Col>
                    {/* <Col md={2}>
                        <Button
                            variant="success"
                            onClick={() => setShowNewProjectModal(true)}
                        >
                            Create New
                        </Button>
                    </Col> */}
                </Row>
            </Container>
            <Container>
                {!isLoading ? <p>{query.searchText}</p> : <Spinner />}
            </Container>
            {/* <NewPorjectModal
                show={showNewProjectModal}
                handleClose={() => setShowNewProjectModal(false)}
                saveProject={saveProject}
            /> */}
        </Container>
    );
};

export default Query;
