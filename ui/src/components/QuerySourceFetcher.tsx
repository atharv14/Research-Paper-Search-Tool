import { useState } from "react";
import { Button, Card, Col, Form, InputGroup, Row } from "react-bootstrap";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiTrash } from "react-icons/fi";
import { datasourceType, resultType } from "../api/types";

interface QuerySourceFetcherProps {
    qId: string;
    datasource: string;
    res: resultType[];
    removeSource: (qId: string, datasource: string) => void;
}

const QuerySourceFetcher = ({
    qId,
    datasource,
    res,
    removeSource,
}: QuerySourceFetcherProps) => {
    // const [isLoading, setIsLoading] = useState(false);
    // const [showResults, setShowResults] = useState(false);

    return (
        <Col md="6">
            <Row className="justify-content-between">
                <Col md="8">
                    <InputGroup className="mb-3">
                        <Form.Control value={datasource} disabled />
                        <Button
                            variant="success"
                            // onClick={() => removeQuery(qId)}
                        >
                            FETCH
                        </Button>
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
                    <Button
                        variant="outline-success"
                        onClick={() => alert("open modal for results")}
                    >
                        Total Results: {res.length}
                    </Button>
                </Col>
            </Row>
        </Col>
    );
};

export default QuerySourceFetcher;
