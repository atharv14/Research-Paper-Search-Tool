import { useEffect, useState } from "react";
import { Accordion, Col, Container, Row, Table } from "react-bootstrap";
import { queryType, resultType } from "../api/types";
type ResultAccordianProps = {
    queries: Array<queryType> | [];
};

interface uniqueResultType extends resultType {
    source: string;
}

const ResultSetAccordian = ({ queries }: ResultAccordianProps) => {
    const [results, setResults] = useState<uniqueResultType[]>([]);

    type returnResults = (arr: uniqueResultType[]) => uniqueResultType[];
    const filterResultsByTitle: returnResults = (arr: uniqueResultType[]) => {
        let f: string[] = [];
        return arr.filter((n) => {
            return f.indexOf(n.title) == -1 && f.push(n.title);
        });
    };
    useEffect(() => {
        let results: uniqueResultType[] = [];
        queries.forEach((query) => {
            let temp = query.results.map((result) => {
                return { ...result, source: query.source };
            });
            results.push(...temp);
        });
        let uniqueResults = filterResultsByTitle(results);
        setResults(uniqueResults);
    }, [queries]);

    return (
        <Container className="query-builder p-0">
            <Accordion defaultActiveKey="0" flush alwaysOpen>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Cumulative Results</Accordion.Header>
                    <Accordion.Body>
                        <Row>
                            <Col>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>title</th>
                                            <th>link</th>
                                            <th>source</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {results.map(
                                            (
                                                { id, title, link, source },
                                                i
                                            ) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{title}</td>
                                                    <td>{link}</td>
                                                    <td>{source}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>
        </Container>
    );
};

export default ResultSetAccordian;
