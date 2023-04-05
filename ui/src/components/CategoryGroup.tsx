import {
    Button,
    Card,
    Col,
    Container,
    Form,
    InputGroup,
    Row,
} from "react-bootstrap";
import { categorySetType, categoryType } from "../api/types";
import { v4 as uuidv4 } from "uuid";

interface categoryProps {
    categories: categorySetType;
    setCategories: (cats: categorySetType) => void;
}

const CategoryGroup = ({ categories, setCategories }: categoryProps) => {
    const addCategory = () => {
        const newId: string = uuidv4();
        const newCategory: categoryType = {
            label: "New Category",
            color: "#563d7c",
            priority: Object.keys(categories).length + 1,
        };
        setCategories({ ...categories, [newId]: newCategory });
    };

    const updateCategory = (cId: string, key: string, value: any) => {
        setCategories({
            ...categories,
            [cId]: {
                ...categories[cId],
                [key]: value,
            },
        });
    };

    return (
        <Container className="text-center">
            {Object.entries(categories).map(([cId, cat], i) => {
                return (
                    <Card key={i} className="mb-2">
                        <Card.Body>
                            <Row>
                                <Col md="5">
                                    <InputGroup>
                                        <InputGroup.Text>Label</InputGroup.Text>
                                        <Form.Control
                                            type="text"
                                            placeholder="Category Label"
                                            value={cat.label}
                                            onChange={(e) =>
                                                updateCategory(
                                                    cId,
                                                    "label",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md="4">
                                    <InputGroup>
                                        <InputGroup.Text>
                                            Priority
                                        </InputGroup.Text>
                                        <Form.Control
                                            type="number"
                                            name="priority"
                                            min={0}
                                            value={cat.priority}
                                            onChange={(e) =>
                                                updateCategory(
                                                    cId,
                                                    "priority",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </InputGroup>
                                </Col>
                                <Col md="3">
                                    <InputGroup>
                                        <InputGroup.Text>Color</InputGroup.Text>
                                        <Form.Control
                                            type="color"
                                            name="color"
                                            value={cat.color}
                                            onChange={(e) =>
                                                updateCategory(
                                                    cId,
                                                    "color",
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </InputGroup>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Card>
                );
            })}
            <Button variant="outline-success" onClick={addCategory}>
                ADD
            </Button>
        </Container>
    );
};

export default CategoryGroup;
