import { request, response, Router } from "express";

import { UsersRepository } from "../repositories/UsersRepository";
import { CreateUserService } from "../services/CreateUserService";

const usersRoutes = Router();

const usersRepository = new UsersRepository();

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json({ all });
});

usersRoutes.post("/", (request, response) => {
    const { username, name, email, phone } = request.body;

    const createUserService = new CreateUserService(
        usersRepository
    );

    createUserService.execute({ username, name, email, phone });

    return response.status(201).send();
});

export { usersRoutes };