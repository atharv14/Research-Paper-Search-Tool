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
                text: "ML AND Ai",
                source: "SCOPUS",
                results: [
                    {
                        id: 1,
                        title: "title1",
                        link: "https://somelink.com",
                    },
                    {
                        id: 2,
                        title: "title2",
                        link: "https://somelink.com",
                    },
                    {
                        id: 3,
                        title: "title3",
                        link: "https://somelink.com",
                    },
                ],
            },
            {
                id: 2,
                name: "Query2",
                text: "ML AND Ai",
                source: "IEEE",
                results: [
                    {
                        id: 4,
                        title: "title1",
                        link: "https://somelink.com",
                    },
                    {
                        id: 5,
                        title: "title4",
                        link: "https://somelink.com",
                    },
                ],
            },
            {
                id: 3,
                name: "Query3",
                text: "CNN AND Images",
                source: "SCOPUS",
                results: [
                    {
                        id: 6,
                        title: "title",
                        link: "https://somelink.com",
                    },
                ],
            },
        ],
        desc: "this is project 1 description",
    },
    {
        id: 2,
        name: "Project2",
        owner: "john_Doe",
        collections: [1, 2, 3],
        queries: [
            {
                id: 4,
                name: "Query4",
                text: "ML AND Ai",
                source: "SCOPUS",
                results: [
                    {
                        id: 7,
                        title: "title1",
                        link: "https://somelink.com",
                    },
                    {
                        id: 8,
                        title: "title2",
                        link: "https://somelink.com",
                    },
                ],
            },
            {
                id: 5,
                name: "ML Query",
                text: "ML AND Ai",
                source: "SCOPUS",
                results: [
                    {
                        id: 9,
                        title: "title1",
                        link: "https://somelink.com",
                    },
                    {
                        id: 10,
                        title: "title2",
                        link: "https://somelink.com",
                    },
                    {
                        id: 11,
                        title: "title3",
                        link: "https://somelink.com",
                    },
                ],
            },
            {
                id: 6,
                name: "ML Query",
                text: "ML AND Ai",
                source: "IEEE",
                results: [
                    {
                        id: 12,
                        title: "title4",
                        link: "https://somelink.com",
                    },
                ],
            },
        ],
        desc: "this is Project 2 description",
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
