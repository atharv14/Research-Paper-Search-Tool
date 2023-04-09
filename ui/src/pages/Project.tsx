import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { FiSettings } from "react-icons/fi";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getProject } from "../api/project";
import { getQueries } from "../api/query";
import { categorySetType, projectType, querySetType } from "../api/types";
import QueryAccordian from "../components/QueryAccordian";
import { categories } from "../api/dummyData";
import { getCategories, postCategories } from "../api/category";
import Categories from "../components/Categories";

const Project = () => {
    const [project, setProject] = useState<projectType>({
        projectId: 0,
        collections: [],
        description: "",
        projectName: "",
        owner: "",
    });
    const [queries, setQueries] = useState<querySetType>({});
    const [categories, setCategories] = useState<categorySetType>({});
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const fetchProject = (id: number) => {
        setIsLoading(true);
        getProject(id)
            .then((data) => setProject(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchCategories = (pId: number) => {
        setIsLoading(true);
        getCategories(pId)
            .then((data) => setCategories(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    const fetchQueries = (pId: number) => {
        setIsLoading(true);
        getQueries(pId)
            .then((data) => setQueries(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            })
            .finally(() => setIsLoading(false));
    };

    const saveCategories = () => {
        postCategories(project.projectId, categories)
            .then((data) => setCategories(data))
            .catch((e) => {
                alert("Something went wrong");
                console.log(e);
            });
    };

    useEffect(() => {
        const id = parseInt(searchParams.get("id") || "0");
        if (id === 0) navigate("/"); // send to dashboard if no id in url
        fetchProject(id);
        fetchQueries(id);
        fetchCategories(id);
    }, []);

    return (
        <Container className="project-page">
            {!isLoading ? (
                <>
                    <Row className="project-head justify-content-between">
                        <Col xs="11">
                            <h2>{project.projectName}</h2>
                        </Col>
                    </Row>
                    <Categories
                        categories={categories}
                        setCategories={(cats: categorySetType) =>
                            setCategories(cats)
                        }
                        saveCategories={saveCategories}
                    />
                    {Object.keys(categories).length &&
                    Object.values(categories)[0]["categoryId"] ? (
                        <Container className="query-section">
                            <QueryAccordian
                                initialQueries={queries}
                                projectId={parseInt(
                                    searchParams.get("id") || "0"
                                )}
                                categories={categories}
                            />
                        </Container>
                    ) : (
                        <> </>
                    )}
                </>
            ) : (
                <Spinner />
            )}
        </Container>
    );
};

export default Project;
