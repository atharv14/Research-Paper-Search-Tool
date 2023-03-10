import React from "react";
import { QueryBuilderBootstrap } from "@react-querybuilder/bootstrap";
import { useState } from "react";
import type { Field, RuleGroupType, Operator } from "react-querybuilder";
import { formatQuery, QueryBuilder } from "react-querybuilder";
import { Container } from "react-bootstrap";
// import "./styles.scss";

const fields: Field[] = [{ name: "keyword", label: "keyword" }];
const operators: Operator[] = [{ name: "=", label: "=" }];

const initialQuery: RuleGroupType = {
    combinator: "and",
    rules: [],
};

const QueryInput = () => {
    const [query, setQuery] = useState(initialQuery);
    const [queryString, setQueryString] = useState("");

    const handleQueryChange = (q: RuleGroupType) => {
        setQuery(q);
        const qString = formatQuery(q, "sql").replaceAll("keyword = ", "");
        console.log(qString);
        setQueryString(qString);
    };

    return (
        <Container>
            <QueryBuilderBootstrap>
                <QueryBuilder
                    fields={fields}
                    query={query}
                    operators={operators}
                    onQueryChange={(q) => handleQueryChange(q)}
                />
            </QueryBuilderBootstrap>
            <Container className="p-2">
                <h5>Query : {queryString}</h5>
            </Container>
        </Container>
    );
};

export default QueryInput;
