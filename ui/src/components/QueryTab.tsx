import { queries } from "@testing-library/react";
import React, { useEffect, useState } from "react";
import {
    Accordion,
    Button,
    ButtonGroup,
    Col,
    Dropdown,
    DropdownButton,
    Form,
    InputGroup,
    Row,
    Spinner,
} from "react-bootstrap";
import { FiTrash } from "react-icons/fi";
import { search } from "../api/search";
import {
    categorySetType,
    datasourceType,
    queryType,
    resultType,
    uniqueResultType,
} from "../api/types";
import { filterResultsByTitle, getDataSources } from "../api/utility";
import CumulativeResultsTableModal from "./CumulativeResultsTableModal";
import QuerySourceFetcher from "./QuerySourceFetcher";

interface QueryTabProps {
    qId: string;
    query: queryType;
    categories: categorySetType;
    buildQuery: (qId: string) => void;
    removeQuery: (qId: string) => void;
    removeSource: (qId: string, datasource: string) => void;
    addResultToSource: (
        qId: string,
        source: datasourceType,
        result: resultType[]
    ) => void;
    saveQueryResults: (qId: string) => void;
}

const QueryTab = ({
    qId,
    query,
    categories,
    buildQuery,
    removeQuery,
    removeSource,
    addResultToSource,
    saveQueryResults,
}: QueryTabProps) => {
    const datasources = getDataSources();
    const [showResults, setShowResults] = useState(false);
    const [allResults, setAllResults] = useState<uniqueResultType[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const fetchResults = (datasource: datasourceType) => {
        setIsLoading(true);
        search({ datasource, queryText: query.searchText, categories })
            .then((data) => {
                addResultToSource(qId, datasource, data);
                updateAllResults();
            })
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    // TODO: update on add result and delete result as well
    const updateAllResults = () => {
        let updatedAllResults: uniqueResultType[] = [];
        Object.entries(query.searchResults).forEach(([source, res]) => {
            let temp = res.map((row) => {
                return { ...row, source };
            });
            updatedAllResults.push(...temp);
        });
        let uniqueResults = filterResultsByTitle(updatedAllResults);
        setAllResults(uniqueResults);
    };
    // useEffect(updateAllResults, [query]);
    return (
        <>
            <Accordion.Item eventKey={qId}>
                <Accordion.Header>Query</Accordion.Header>
                <Accordion.Body>
                    <Row>
                        <Col md="11">
                            <InputGroup className="mb-3">
                                <Form.Control
                                    placeholder="Write your query..."
                                    disabled
                                    value={query.searchText}
                                />
                                <Button
                                    variant="secondary"
                                    onClick={() => buildQuery(qId)}
                                    disabled={query.queryId ? true : false}
                                >
                                    Use Query Builder
                                </Button>
                            </InputGroup>
                        </Col>
                        <Col md="1">
                            <Button
                                variant="danger"
                                onClick={() => removeQuery(qId)}
                            >
                                <FiTrash
                                    className="cursor-pointer"
                                    size={"1.5em"}
                                />
                            </Button>
                        </Col>
                    </Row>
                    <Row className="justify-content-center">
                        {Object.entries(query.searchResults).map(
                            ([source, res]) => (
                                <QuerySourceFetcher
                                    key={source}
                                    datasource={source as datasourceType}
                                    res={res}
                                    qId={qId}
                                    removeSource={removeSource}
                                    fetchResults={fetchResults}
                                    freeze={query.queryId ? true : false}
                                />
                            )
                        )}
                    </Row>
                    <Row className="justify-content-center">
                        {isLoading && (
                            <Spinner animation="border" variant="success" />
                        )}
                    </Row>
                    {!query.queryId ? (
                        <Row className="justify-content-between mt-2">
                            <Col sm="3">
                                <DropdownButton
                                    as={ButtonGroup}
                                    variant="secondary"
                                    title="Add Datasource"
                                    onSelect={(val) =>
                                        addResultToSource(
                                            qId,
                                            val as datasourceType,
                                            []
                                        )
                                    }
                                >
                                    {datasources.map((source) => (
                                        <Dropdown.Item
                                            key={source}
                                            eventKey={source}
                                        >
                                            {source}
                                        </Dropdown.Item>
                                    ))}
                                </DropdownButton>
                            </Col>
                            {Object.keys(query.searchResults).length ? (
                                <>
                                    <Col
                                        sm="3"
                                        className="d-flex justify-content-center"
                                    >
                                        <Button
                                            variant="outline-success"
                                            onClick={() => setShowResults(true)}
                                        >
                                            Show All {allResults.length}
                                        </Button>
                                    </Col>
                                    <Col
                                        sm="3"
                                        className="d-flex justify-content-end"
                                    >
                                        <Button
                                            variant="success"
                                            onClick={() =>
                                                saveQueryResults(qId)
                                            }
                                        >
                                            SAVE
                                        </Button>
                                    </Col>
                                </>
                            ) : (
                                <></>
                            )}
                        </Row>
                    ) : (
                        <Row className="justify-content-center mt-2">
                            <Col md={1}>
                                <Button variant="success">CURATE</Button>
                            </Col>
                        </Row>
                    )}
                </Accordion.Body>
            </Accordion.Item>
            <CumulativeResultsTableModal
                show={showResults}
                res={allResults}
                handleClose={() => setShowResults(false)}
            />
        </>
    );
};

export default QueryTab;
