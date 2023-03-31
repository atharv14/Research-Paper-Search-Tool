import React, { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { datasourceType, resultType } from "../api/types";
import ResultsTableModal from "./ResultsTableModal";

interface QuerySourceFetcherProps {
    qId: string;
    datasource: datasourceType;
    res: resultType[];
    removeSource: (qId: string, datasource: datasourceType) => void;
    fetchResults: (datasource: datasourceType) => void;
}

const QuerySourceFetcher = ({
    qId,
    datasource,
    res,
    removeSource,
    fetchResults,
}: QuerySourceFetcherProps) => {
    // const [isLoading, setIsLoading] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [disableFetch, setDisableFetch] = useState(false);
    const handleFetch = () => {
        setDisableFetch(true);
        fetchResults(datasource);
    };

    return (
        <>
            <Col md="6">
                <Row className="justify-content-between">
                    <Col md="8">
                        <InputGroup className="mb-3">
                            <Form.Control value={datasource} disabled />
                            <Button
                                variant="danger"
                                onClick={() => removeSource(qId, datasource)}
                            >
                                <FiTrash
                                    className="cursor-pointer"
                                    size={"1.5em"}
                                />
                            </Button>
                        </InputGroup>
                    </Col>
                    <Col md="4">
                        {res.length ? (
                            <Button
                                variant="outline-success"
                                onClick={() => setShowResults(true)}
                            >
                                Total Results: {res.length}
                            </Button>
                        ) : (
                            <Button
                                variant="success"
                                onClick={handleFetch}
                                disabled={disableFetch}
                            >
                                FETCH
                            </Button>
                        )}
                    </Col>
                </Row>
            </Col>
            <ResultsTableModal
                show={showResults}
                res={res}
                handleClose={() => setShowResults(false)}
            />
        </>
    );
};

export default QuerySourceFetcher;
