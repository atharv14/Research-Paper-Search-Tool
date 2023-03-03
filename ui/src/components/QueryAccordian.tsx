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
import { queryType } from "../api/types";

type QueryAccordianProps = {
    queries: Array<queryType> | [];
    removeQuery: (qId: number) => void;
};

const QueryAccordian = ({ queries, removeQuery }: QueryAccordianProps) => {
    return (
        <Container className="query-builder p-0">
            <Accordion defaultActiveKey="0" alwaysOpen>
                {queries?.map((query, i) => (
                    <Accordion.Item eventKey={i.toString()} key={i}>
                        <Accordion.Header>{query.name}</Accordion.Header>
                        <Accordion.Body>
                            <Row>
                                <Col xs="10">
                                    <Form.Group className="mb-3">
                                        <Form.Control type="text" />
                                    </Form.Group>
                                </Col>
                                <Col>
                                    <ButtonGroup className="mb-2">
                                        <Button variant="success">FETCH</Button>
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
                ))}
            </Accordion>
        </Container>
    );
};

export default QueryAccordian;
