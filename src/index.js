const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const port = 3333;
const users = [];

app.get("/users", (request, response) => {
    return response.json(users);
});

app.post("/users", (request, response) => {
    const {
        username,
        name,
        email,
        phone,
    } = request.body;

    const userAlreadyExist = users.find(
        (user) => user.username === username
    );

    if (userAlreadyExist) {
        return response.status(400).json(
            { error: "Username already exist!" }
        );
    }

    const newUser = {
        id: uuidv4(),
        created_at: new Date(),
        username,
        score: 0,
        level: 0,
        name,
        email,
        phone,
        address: []
    }

    users.push(newUser);

    return response.status(201).json(
        { success: "User created successfully!" }
    );
});

app.listen(port, () => {
    console.log(`Started application at http://localhost:${port} ⚡`);
});