import { Card } from "react-bootstrap";

interface projectCardProps {
    name: string;
    desc: string;
}
const ProjectCard = ({ name, desc }: projectCardProps) => {
    return (
        <Card bg="secondary" text="light" className="project-card">
            <Card.Header>Title</Card.Header>
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {desc.length > 100 ? desc.slice(0, 100) + "..." : desc}
                </Card.Text>
            </Card.Body>
        </Card>
    );
};

export default ProjectCard;
