import React from "react";
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
} from "react-bootstrap";
import { FiTrash } from "react-icons/fi";
import { datasourceType, queryType } from "../api/types";
import { getDataSources } from "../api/utility";
import QuerySourceFetcher from "./QuerySourceFetcher";

interface QueryTabProps {
    qId: string;
    query: queryType;
    buildQuery: (qId: string) => void;
    removeQuery: (qId: string) => void;
    removeSource: (qId: string, datasource: string) => void;
    addSourceInResult: (qId: string, source: datasourceType) => void;
}

const QueryTab = ({
    qId,
    query,
    buildQuery,
    removeQuery,
    removeSource,
    addSourceInResult,
}: QueryTabProps) => {
    const datasources = getDataSources();
    const handleQueryTextChange = () => {};
    return (
        <Accordion.Item eventKey={qId}>
            <Accordion.Header>{query.name}</Accordion.Header>
            <Accordion.Body>
                <Row>
                    <Col md="11">
                        <InputGroup className="mb-3">
                            <Form.Control
                                placeholder="Write your query..."
                                disabled
                                value={query.text}
                                onChange={handleQueryTextChange}
                            />
                            <Button
                                variant="secondary"
                                onClick={() => buildQuery(qId)}
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
                    {Object.entries(query.results).map(([source, res]) => (
                        <QuerySourceFetcher
                            key={source}
                            datasource={source}
                            res={res}
                            qId={qId}
                            removeSource={removeSource}
                        />
                    ))}
                </Row>
                <Row className="justify-content-between mt-2">
                    <Col sm="3">
                        <DropdownButton
                            as={ButtonGroup}
                            variant="secondary"
                            title="Add Datasource"
                            onSelect={(val) =>
                                addSourceInResult(qId, val as datasourceType)
                            }
                        >
                            {datasources.map((source) => (
                                <Dropdown.Item key={source} eventKey={source}>
                                    {source}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Col>
                    <Col sm="3" className="d-flex justify-content-end">
                        {Object.keys(query.results).length ? (
                            <Button variant="success">MERGE</Button>
                        ) : (
                            <></>
                        )}
                    </Col>
                </Row>
            </Accordion.Body>
        </Accordion.Item>
    );
};

export default QueryTab;
