import { Col, Row } from "react-bootstrap";
import { categorySetType } from "../api/types";

interface CategorySymbolProps {
    color: string;
}

export const CategorySymbol = ({ color }: CategorySymbolProps) => {
    return <span className="dot" style={{ backgroundColor: color }}></span>;
};

interface CategoryLabelProps {
    categories: categorySetType;
}

export const CategoryLabels = ({ categories }: CategoryLabelProps) => {
    return (
        <>
            <Row>
                {Object.values(categories).map((cat) => (
                    <Col>
                        <p>
                            <CategorySymbol color={cat.color} /> {cat.label}
                        </p>
                    </Col>
                ))}
            </Row>
        </>
    );
};
