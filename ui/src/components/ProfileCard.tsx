import { Card, Col, Container, Row } from "react-bootstrap";
import { FiEdit2 } from "react-icons/fi";

const ProfileCard = () => {
    return (
        <Container className="profile-card mt-4">
            <Row>
                <Col md={3}>
                    <img src="https://via.placeholder.com/250x400.png" />
                </Col>
                <Col md={9}>
                    <Container className="profile-about">
                        <FiEdit2 className="profile-edit-icon" size={"1.5em"} />
                        <h2>Username</h2>
                        <p>
                            Lorem ipsum dolor sit amet, consectetur adipiscing
                            elit. Nunc maximus, nulla ut commodo sagittis,
                            sapien dui mattis dui, non pulvinar lorem felis nec
                            erat
                        </p>
                        <p className="profile-contact">johndoe@example.com</p>
                    </Container>
                </Col>
            </Row>
        </Container>
    );
};

export default ProfileCard;
