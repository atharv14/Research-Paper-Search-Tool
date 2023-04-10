import {
    Alert,
    Button,
    Col,
    Container,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { categorySetType, projectType, queryType } from "../api/types";
import { getQuery } from "../api/query";
import { getCategories } from "../api/category";
import { getColor } from "../api/utility";
const dummyQuery: queryType = {
    queryId: 0,
    searchText: "",
    searchResults: {},
};
const Query = () => {
    const [query, setQuery] = useState<queryType>(dummyQuery);
    const [isLoading, setIsLoading] = useState(false);
    const [currentSource, setCurrentSource] = useState("");
    const [categories, setCategories] = useState<categorySetType>({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fetchQuery = (id: number) => {
        getQuery(id)
            .then((data) => setQuery(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchCategory = (pId: number) => {
        getCategories(pId)
            .then((data) => setCategories(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0");
        const pId = parseInt(searchParams.get("pId") || "0");
        if (id === 0 || pId === 0) navigate("/"); // send to dashboard if no id in url
        fetchQuery(id);
        fetchCategory(pId);
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
                {!isLoading ? (
                    <>
                        <Container>
                            <p>
                                Query:
                                <Alert variant="secondary" className="p-2 m-1">
                                    <code>{query.searchText}</code>
                                </Alert>
                            </p>
                        </Container>
                        <Container>
                            <Row>
                                {Object.keys(query.searchResults).map(
                                    (source) => (
                                        <Col md={1}>
                                            <Button
                                                variant={
                                                    currentSource === source
                                                        ? "primary"
                                                        : "outline-primary"
                                                }
                                                onClick={() =>
                                                    setCurrentSource(source)
                                                }
                                            >
                                                {source}
                                            </Button>
                                        </Col>
                                    )
                                )}
                            </Row>
                            <Row>
                                <Col>
                                    {currentSource ? (
                                        <Table striped>
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Title</th>
                                                    <th>Article Date</th>
                                                    <th>ISSN</th>
                                                    <th>Category</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {Object.values(
                                                    query.searchResults[
                                                        currentSource
                                                    ]
                                                ).map(
                                                    (
                                                        { document, priority },
                                                        i
                                                    ) => (
                                                        <tr key={i}>
                                                            <td>{i + 1}</td>
                                                            <td>
                                                                {document.title}
                                                            </td>
                                                            <td>
                                                                {
                                                                    document.articleDate
                                                                }
                                                            </td>
                                                            <td>
                                                                {document.issn}
                                                            </td>
                                                            <td>
                                                                {getColor(
                                                                    categories,
                                                                    priority
                                                                )}
                                                            </td>
                                                        </tr>
                                                    )
                                                )}
                                            </tbody>
                                        </Table>
                                    ) : (
                                        <></>
                                    )}
                                </Col>
                            </Row>
                        </Container>
                    </>
                ) : (
                    <Spinner />
                )}
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
