import { projectType } from "./types";

const userData = {
    firstName: "John",
    lastName: "Doe",
    username: "John_Doe",
    email: "johndoe@gmail.com",
    profilePicture: "https://via.placeholder.com/250x400.png",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus, nulla ut commodo sagittis, sapien dui mattis dui, non pulvinar lorem felis nec erat",
};

const projects: projectType[] = [
    {
        id: 1,
        name: "Project1",
        owner: "john_Doe",
        collections: [1],
        queries: [
            {
                id: 1,
                name: "Query1",
                text: "",
                source: "ieee",
                results: [],
            },
        ],
        desc: "this is project 1 description",
    },
];

const categories = [
    {
        projectId: 1,
        priority: 1,
        label: "important",
        color: "#EF3F19",
    },
    {
        projectId: 1,
        priority: 2,
        label: "less important",
        color: "#ECC2BA",
    },
    {
        projectId: 2,
        priority: 1,
        label: "interesting",
        color: "#0B88EB",
    },
];

export { projects, categories, userData };
