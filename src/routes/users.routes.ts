import { response, Router } from "express";

import { UsersRepository } from "../repositories/UsersRepository";

const usersRoutes = Router();

const usersRepository = new UsersRepository();

usersRoutes.get("/", (request, response) => {
    const all = usersRepository.list();

    return response.json({ all });
});

export { usersRoutes };