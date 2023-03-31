import { useEffect, useState } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import { datasourceType, querySetType, queryType } from "../api/types";
import QueryBuilderModal from "./QueryBuilderModal";
import QueryTab from "./QueryTab";
import { v4 as uuidv4 } from "uuid";
import { getQuery } from "../api/query";

type QueryAccordianProps = {
    searchQuery: (qId: string) => void;
};

const QueryAccordian = () => {
    const [showQueryBuilderModal, setShowQueryBuilderModal] = useState(false);
    const [currentQid, setCurrentQId] = useState(""); // remember query id for which query text is being generated in modal
    const [queries, setQueries] = useState<querySetType>({});

    useEffect(() => {
        const data = getQuery();
        setQueries(data);
    }, []);

    const buildQuery = (qId: string) => {
        setCurrentQId(qId);
        setShowQueryBuilderModal(true);
    };
    const removeSource = (qId: string, source: string) => {
        let updatedQueries = { ...queries };
        console.log(updatedQueries);
        delete updatedQueries[qId]["results"][source];
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
            name: "new query",
            text: "",
            results: {},
        };
        setQueries({ ...queries, [newId]: newQuery });
    };

    const setCurrentQuery = (qS: string) => {
        // TODO: update queries variable instead of below manipulation
        setQueries({
            ...queries,
            [currentQid]: {
                ...queries[currentQid],
                text: qS,
            },
        });
        setShowQueryBuilderModal(false);
    };

    const addSourceInResult = (qId: string, source: datasourceType) => {
        let updatedQueries = { ...queries };
        if (!updatedQueries[qId].results[source])
            // add source as key to results of that query
            updatedQueries[qId].results[source] = [];
        setQueries(updatedQueries);
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
                                addSourceInResult={addSourceInResult}
                            />
                        ))
                        .reverse()}
                </Accordion>
                <QueryBuilderModal
                    show={showQueryBuilderModal}
                    saveQuery={setCurrentQuery}
                    handleClose={() => setShowQueryBuilderModal(false)}
                />
            </Container>
        </>
    );
};

export default QueryAccordian;
