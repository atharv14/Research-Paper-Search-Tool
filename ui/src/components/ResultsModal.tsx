import React from "react";
import { Button, Container, Modal, Table } from "react-bootstrap";
import { AiOutlineTable } from "react-icons/ai";

interface resultModalProps {
    qName: string;
    show: boolean;
    handleClose: () => void;
}

const ResultsModal = ({ show, handleClose }: resultModalProps) => {
    return (
        <Modal show={show} onHide={handleClose} size="xl">
            <Modal.Header closeButton>
                <Modal.Title id="example-custom-modal-styling-title">
                    Results for
                </Modal.Title>
            </Modal.Header>
            <Container>
                <Table striped>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>title</th>
                            <th>source</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>sdsds</td>
                            <td>fddsfsd</td>
                        </tr>
                    </tbody>
                </Table>
            </Container>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default ResultsModal;
