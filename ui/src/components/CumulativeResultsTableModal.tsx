import { Button, Col, Container, Modal, Row, Table } from "react-bootstrap";
import { resultType, uniqueResultType } from "../api/types";

interface cumulativeResultsTableModalProps {
    show: boolean;
    res: uniqueResultType[];
    handleClose: () => void;
}

const CumulativeResultsTableModal = ({
    show,
    res,
    handleClose,
}: cumulativeResultsTableModalProps) => {
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
                                    <th>Source</th>
                                </tr>
                            </thead>
                            <tbody>
                                {res.map(
                                    (
                                        { title, articleDate, issn, source },
                                        i
                                    ) => (
                                        <tr key={i}>
                                            <td>{i + 1}</td>
                                            <td>{title}</td>
                                            <td>{articleDate}</td>
                                            <td>{issn}</td>
                                            <td>{source.toUpperCase()}</td>
                                        </tr>
                                    )
                                )}
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

export default CumulativeResultsTableModal;
