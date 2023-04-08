import { QueryBuilderBootstrap } from "@react-querybuilder/bootstrap";
import { useEffect, useState } from "react";
import {
    Field,
    RuleGroupType,
    Operator,
    parseSQL,
    update,
} from "react-querybuilder";
import { formatQuery, QueryBuilder } from "react-querybuilder";
import { Button, Container, Modal } from "react-bootstrap";
import { processQueryText } from "../api/utility";
// import "./styles.scss";

const fields: Field[] = [{ name: "keyword", label: "keyword" }];
const operators: Operator[] = [{ name: "=", label: "=" }];

const initialQuery: RuleGroupType = {
    combinator: "and",
    rules: [],
};

interface queryBuilderModalProps {
    show: boolean;
    incomingQuery: string;
    handleClose: () => void;
    saveQuery: (qS: string, qF: string) => void;
}

const QueryBuilderModal = ({
    show,
    incomingQuery,
    handleClose,
    saveQuery,
}: queryBuilderModalProps) => {
    const [query, setQuery] = useState(initialQuery); // query built by builder lib
    const [queryFormat, setQueryFormat] = useState(incomingQuery); // maintaining format to revert from string to builder
    const [queryString, setQueryString] = useState(""); // plain string for us to show
    const onSaveClose = () => {
        saveQuery(queryString, queryFormat);
    };
    const handleQueryChange = (q: RuleGroupType) => {
        setQuery(q);
    };
    useEffect(() => {
        const qFormat = formatQuery(query, "sql");
        setQueryFormat(qFormat);
        setQueryString(processQueryText(qFormat));
    }, [query]);

    return (
        <Modal
            show={show}
            onEntered={() => setQuery(parseSQL(incomingQuery))}
            onHide={handleClose}
            size="xl"
        >
            <Modal.Header>
                <Modal.Title id="example-custom-modal-styling-title">
                    Build Your Query
                </Modal.Title>
            </Modal.Header>
            <Container className="p-4">
                <QueryBuilderBootstrap>
                    <QueryBuilder
                        fields={fields}
                        query={query}
                        operators={operators}
                        onQueryChange={(q) => handleQueryChange(q)}
                    />
                </QueryBuilderBootstrap>
            </Container>
            <Container className="mb-4">
                <h5>Query : {queryString}</h5>
            </Container>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={onSaveClose}>
                    Use Query
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default QueryBuilderModal;
