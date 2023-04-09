import {
    Alert,
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
import { FiTrash } from "react-icons/fi";

interface categoryProps {
    categories: categorySetType;
    setCategories: (cats: categorySetType) => void;
    saveCategories: () => void;
}

const Categories = ({
    categories,
    setCategories,
    saveCategories,
}: categoryProps) => {
    const addCategory = () => {
        const newId: string = uuidv4();
        const newCategory: categoryType = {
            categoryId: 0,
            label: "New Category",
            color: "#563d7c",
            priority: Object.keys(categories).length,
        };
        setCategories({ ...categories, [newId]: newCategory });
    };
    const removeCategory = (cId: string) => {
        let updatedCategories = { ...categories };
        delete updatedCategories[cId];
        setCategories(updatedCategories);
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
        <Container className="">
            <Container className="d-flex justify-content-between p-2">
                <Form.Label>Categories</Form.Label>
                <Button variant="outline-success" onClick={addCategory}>
                    ADD
                </Button>
            </Container>
            <Container className="text-end">
                {!Object.entries(categories).length ? (
                    <Alert variant="info" className="text-start">
                        Add a categgory to start searching...
                    </Alert>
                ) : (
                    <></>
                )}
                {Object.entries(categories).map(([cId, cat], i) => {
                    return (
                        <Card key={i} className="mb-2">
                            <Card.Body>
                                <Row>
                                    <Col md="4">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                Label
                                            </InputGroup.Text>
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
                                    <Col md="2">
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
                                    <Col md="2">
                                        <InputGroup>
                                            <InputGroup.Text>
                                                Color
                                            </InputGroup.Text>
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
                                    <Col md="1">
                                        <Button
                                            variant="danger"
                                            onClick={() => removeCategory(cId)}
                                        >
                                            <FiTrash
                                                className="cursor-pointer"
                                                size={"1.5em"}
                                            />
                                        </Button>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    );
                })}
                {Object.keys(categories).length ? (
                    <Button variant="success" onClick={saveCategories}>
                        SAVE
                    </Button>
                ) : (
                    <></>
                )}
            </Container>
        </Container>
    );
};

export default Categories;
