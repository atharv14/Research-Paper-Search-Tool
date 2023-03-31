import { QueryBuilderBootstrap } from "@react-querybuilder/bootstrap";
import { useState } from "react";
import type { Field, RuleGroupType, Operator } from "react-querybuilder";
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

interface queryInputProps {
    show: boolean;
    handleClose: () => void;
    saveQuery: (qS: string) => void;
}

const QueryBuilderModal = ({
    show,
    handleClose,
    saveQuery,
}: queryInputProps) => {
    const [query, setQuery] = useState(initialQuery);
    const [queryString, setQueryString] = useState("");
    const onSaveClose = () => {
        // reset the builder once use query click
        setQuery(initialQuery);
        saveQuery(queryString);
    };
    const handleQueryChange = (q: RuleGroupType) => {
        setQuery(q);
        // console.log(q);
        const qString = formatQuery(q, "sql").replaceAll("keyword = ", "");
        setQueryString(processQueryText(qString));
    };

    return (
        <Modal
            show={show}
            onShow={() => setQuery(initialQuery)}
            onHide={handleClose}
            size="xl"
        >
            <Modal.Header closeButton>
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
