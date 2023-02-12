import { Card } from "react-bootstrap";

const ProjectCard = () => {
    return (
        <Card bg="secondary" text="light" className="project-card">
            <Card.Header>Title</Card.Header>
            <Card.Body>
                <Card.Title>Project Name</Card.Title>
                <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;
