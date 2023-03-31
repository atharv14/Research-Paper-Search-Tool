import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { resultType } from "../api/types";

interface resultsTableModalProps {
    show: boolean;
    res: resultType[];
    handleClose: () => void;
}

const ResultsTableModal = ({
    show,
    res,
    handleClose,
}: resultsTableModalProps) => {
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title>Results</Modal.Title>
            </Modal.Header>
            <Container className="p-4">
                <Row>
                    <Col>
                        <Table striped>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Article Date</th>
                                    <th>ISSN</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.map(({ title, articleDate, issn }, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{title}</td>
                                        <td>{articleDate}</td>
                                        <td>{issn}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                {/* <Button variant="primary" onClick={onSaveClose}>
                    Use Query
                </Button> */}
            </Modal.Footer>
        </Modal>
    );
};

export default ResultsTableModal;
