const { response } = require("express");
const express = require("express");
const { v4: uuidv4 } = require("uuid");

const app = express();
app.use(express.json());

const port = 3333;
const users = [];

function VerifyUserExist(request, response, next) {
    const { id } = request.params;

    const user = users.find((user) => user.id === id);

    if (!user) {
        return response.status(404).json(
            { error: "User not found!" }
        );
    }

    request.user = user;

    return next();
}

// Retorna todos os usuários
app.get("/users", (request, response) => {
    return response.json(users);
});

// Cadastra um usuário
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

// Altera dados do usuário, exceto endereço
app.put("/users/:id", VerifyUserExist, (request, response) => {
    const { name, email, phone } = request.body;
    const { user } = request;

    user.name = name;
    user.email = email;
    user.phone = phone;

    return response.status(200).json(
        { success: "User changed successfully!" }
    );
});

// Altera username do usuário
app.patch("/users/:id", VerifyUserExist, (request, response) => {
    const { username } = request.body;
    const { user } = request;

    user.username = username;

    return response.status(200).json(
        { success: "Username changed successfully!" }
    );
});

// Adiciona o endereço do usuário
app.post("/insert_address/:id", VerifyUserExist, (request, response) => {
    const { user } = request;
    const {
        street,
        number,
        district,
        city,
        state,
        zipCode
    } = request.body;

    const registedAddress = {
        street: street,
        number: number,
        district: district,
        city: city,
        state: state,
        zipCode: zipCode
    }

    user.address.push(registedAddress);

    return response.status(200).json(
        { success: "Address successfully added!" }
    );
});

//Excluir o usuário
app.delete("/delete_user/:id", VerifyUserExist, (request, response) => {
    const { user } = request;
    const { id } = request.params;

    const userIndex = users.findIndex((user) => user.id === id);

    if (userIndex === -1) {
        return response.status(404).json(
            { error: "User not found!" }
        );
    }

    users.splice(userIndex, 1);

    return response.status(200).json(
        { success: "Deleted user!" }
    );
});

app.listen(port, () => {
    console.log(`Started application at http://localhost:${port} ⚡`);
});