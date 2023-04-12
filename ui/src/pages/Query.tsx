import {
    Alert,
    Badge,
    Button,
    Col,
    Container,
    Dropdown,
    ListGroup,
    Row,
    Spinner,
    Table,
} from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { categorySetType, queryType, resultType } from "../api/types";
import { getQuery } from "../api/query";
import { getCategories } from "../api/category";
import { getCategoryColor, mergeResults } from "../api/utility";
import { CategoryLabels, CategorySymbol } from "../components/CategoryLabel";
import { dummyQuery } from "../api/dummyData";

const Query = () => {
    const [query, setQuery] = useState<queryType>(dummyQuery);
    const [results, setResults] = useState<resultType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [categories, setCategories] = useState<categorySetType>({});
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fetchQuery = (id: number) => {
        getQuery(id)
            .then((data) => {
                setQuery(data);
                setResults(mergeResults(Object.values(data.searchResults)));
            })
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

    const updateDocCategory = (resultId: number, priority: number) => {};

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
                        <Button variant="outline-success">
                            Download Report
                        </Button>
                    </Col> */}
                </Row>
            </Container>
            <Container>
                {!isLoading ? (
                    <>
                        <Container className="mb-4">
                            <p>Query:</p>
                            <Alert variant="secondary" className="p-2 m-1">
                                <code>{query.searchText}</code>
                            </Alert>
                        </Container>
                        <Container className="mb-4">
                            <p>Datasources:</p>
                            <ListGroup horizontal>
                                {Object.entries(query.searchResults).map(
                                    ([source, res], i) => (
                                        <ListGroup.Item key={i}>
                                            {source}{" "}
                                            <Badge bg="secondary">
                                                {res.length}
                                            </Badge>
                                        </ListGroup.Item>
                                    )
                                )}
                            </ListGroup>
                        </Container>
                        <Container>
                            <Row>
                                <Col md={2}>
                                    Results:{"  "}
                                    <Badge bg="secondary">
                                        {results.length}
                                    </Badge>
                                </Col>
                                <Col>
                                    <CategoryLabels categories={categories} />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
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
                                            {results.map((res, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>
                                                        {res.document.title}{" "}
                                                    </td>
                                                    <td>
                                                        {
                                                            res.document
                                                                .articleDate
                                                        }
                                                    </td>
                                                    <td>{res.document.issn}</td>
                                                    <td>
                                                        <Dropdown
                                                            onSelect={(val) =>
                                                                updateDocCategory(
                                                                    res.resultId,
                                                                    parseInt(
                                                                        val as string
                                                                    )
                                                                )
                                                            }
                                                        >
                                                            <Dropdown.Toggle variant="secondary">
                                                                <CategorySymbol
                                                                    color={getCategoryColor(
                                                                        categories,
                                                                        res.priority
                                                                    )}
                                                                />
                                                            </Dropdown.Toggle>

                                                            <Dropdown.Menu variant="dark">
                                                                {Object.values(
                                                                    categories
                                                                ).map(
                                                                    (
                                                                        cat,
                                                                        i
                                                                    ) => (
                                                                        <Dropdown.Item
                                                                            key={
                                                                                i
                                                                            }
                                                                            eventKey={
                                                                                cat.priority
                                                                            }
                                                                        >
                                                                            <CategorySymbol
                                                                                color={
                                                                                    cat.color
                                                                                }
                                                                            />{" "}
                                                                            {
                                                                                cat.label
                                                                            }
                                                                        </Dropdown.Item>
                                                                    )
                                                                )}
                                                            </Dropdown.Menu>
                                                        </Dropdown>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </Table>
                                </Col>
                            </Row>
                        </Container>
                    </>
                ) : (
                    <Spinner />
                )}
            </Container>
        </Container>
    );
};

export default Query;
