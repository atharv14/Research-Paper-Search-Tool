CREATE TABLE users (
    username VARCHAR PRIMARY KEY,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL ,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    unique (email)
)

CREATE TABLE projects (
    project_id
)