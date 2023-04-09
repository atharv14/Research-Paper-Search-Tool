import { useEffect, useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import {
    categorySetType,
    datasourceType,
    querySetType,
    queryType,
    resultType,
} from "../api/types";
import QueryBuilderModal from "./QueryBuilderModal";
import QueryTab from "./QueryTab";
import { v4 as uuidv4 } from "uuid";
import { saveQueries } from "../api/query";

type QueryAccordianProps = {
    initialQueries: querySetType;
    projectId: number;
    categories: categorySetType;
};

const QueryAccordian = ({
    initialQueries,
    projectId,
    categories,
}: QueryAccordianProps) => {
    const [showQueryBuilderModal, setShowQueryBuilderModal] = useState(false);
    const [currentQid, setCurrentQId] = useState(""); // remember query id for which query text is being generated in modal
    const [queries, setQueries] = useState(initialQueries);

    const buildQuery = (qId: string) => {
        setCurrentQId(qId);
        setShowQueryBuilderModal(true);
    };
    const removeSource = (qId: string, source: string) => {
        let updatedQueries = { ...queries };
        delete updatedQueries[qId]["searchResults"][source];
        setQueries(updatedQueries);
    };
    const removeQuery = (qId: string) => {
        let updatedQueries = { ...queries };
        delete updatedQueries[qId];
        setQueries(updatedQueries);
    };

    const addQuery = () => {
        const newId: string = uuidv4();
        const newQuery: queryType = {
            queryId: 0,
            searchText: "",
            format: "(1=1)",
            searchResults: {},
        };
        setQueries({ ...queries, [newId]: newQuery });
    };

    const setCurrentQuery = (qS: string, qF: string) => {
        setQueries({
            ...queries,
            [currentQid]: {
                ...queries[currentQid],
                searchText: qS,
                format: qF,
            },
        });
        setShowQueryBuilderModal(false);
    };

    const addResultToSource = (
        qId: string,
        source: datasourceType,
        results: resultType[]
    ) => {
        let updatedQueries = { ...queries };
        if (
            updatedQueries[qId].searchResults[source] &&
            updatedQueries[qId].searchResults[source].length !== 0
        )
            return; // avoid overwrite of results
        updatedQueries[qId].searchResults[source] = results;
        setQueries(updatedQueries);
    };

    const saveQuery = (qId: string) => {
        saveQueries(projectId, queries[qId])
            .then(({ queryId, searchResults, searchText }) => {
                console.log("Update Query for queryId and results");
            })
            .catch((e) => {
                alert("Something Went wrong");
                console.log(e);
            });
    };

    return (
        <>
            <Button onClick={addQuery}>Add Query</Button>
            <Container className="query-builder p-0">
                <Accordion defaultActiveKey="0" alwaysOpen>
                    {Object.entries(queries)
                        .map(([qId, query]) => (
                            <QueryTab
                                key={qId}
                                qId={qId}
                                query={query}
                                buildQuery={buildQuery}
                                removeQuery={removeQuery}
                                removeSource={removeSource}
                                addResultToSource={addResultToSource}
                                saveQueryResults={saveQuery}
                                categories={categories}
                            />
                        ))
                        .reverse()}
                </Accordion>
                <QueryBuilderModal
                    show={showQueryBuilderModal}
                    saveQuery={setCurrentQuery}
                    incomingQuery={
                        queries[currentQid] ? queries[currentQid]["format"] : ""
                    }
                    handleClose={() => setShowQueryBuilderModal(false)}
                />
            </Container>
        </>
    );
};

export default QueryAccordian;
