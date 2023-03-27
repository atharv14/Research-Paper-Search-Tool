import {
    Accordion,
    Button,
    ButtonGroup,
    Col,
    Container,
    Form,
    Row,
    Table,
} from "react-bootstrap";
import { search } from "../api/search";
import { queryType } from "../api/types";
import QueryInput from "./QueryBuilder";

type QueryAccordianProps = {
    queries: Array<queryType> | [];
    removeQuery: (qId: number) => void;
};

const QueryAccordian = ({ queries, removeQuery }: QueryAccordianProps) => {
    const searchQuery = (id: number) => {
        const datasource = (
            document.getElementById("#source_" + id) as HTMLInputElement
        )?.value;
        const queryText = (
            document.getElementById("#query_" + id) as HTMLInputElement
        )?.value;
        const data = search({ datasource, queryText });
        console.log(data);
    };

    return (
        <Container className="query-builder p-0">
            <Accordion defaultActiveKey="0" alwaysOpen>
                {queries
                    ?.map((query, i) => (
                        <Accordion.Item eventKey={i.toString()} key={i}>
                            <Accordion.Header>{query.name}</Accordion.Header>
                            <Accordion.Body>
                                <Row>
                                    <Col md="10">
                                        <QueryInput qId={query.id} />
                                    </Col>
                                    <Col md="2">
                                        <Form.Select
                                            id={"source_" + query.id.toString()}
                                            defaultValue=""
                                        >
                                            <option disabled value="">
                                                Datasource
                                            </option>
                                            <option value="ieee">IEEE</option>
                                            <option value="wos">
                                                Web Of Science
                                            </option>
                                            <option value="pubmed">
                                                Pubmed
                                            </option>
                                        </Form.Select>
                                        <ButtonGroup className="mb-2 mt-4">
                                            <Button
                                                variant="success"
                                                onClick={() =>
                                                    searchQuery(query.id)
                                                }
                                            >
                                                FETCH
                                            </Button>
                                            <Button
                                                variant="danger"
                                                onClick={() =>
                                                    removeQuery(query.id)
                                                }
                                            >
                                                DELETE
                                            </Button>
                                        </ButtonGroup>
                                    </Col>
                                </Row>
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Title</th>
                                            <th>link</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {query.results.map(
                                            ({ id, title, link }, i) => (
                                                <tr key={i}>
                                                    <td>{i + 1}</td>
                                                    <td>{title}</td>
                                                    <td>{link}</td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    ))
                    .reverse()}
            </Accordion>
        </Container>
    );
};

export default QueryAccordian;
