import { IUserRepository } from "../repositories/IUserRepository";


interface IResquest {
    username: string;
    name: string;
    email: string;
    phone: string;
}

class CreateUserService {
    constructor(private usersRepository: IUserRepository) {}

    execute({ username, name, email, phone }: IResquest): void {
        const userAlreadyExist = this.usersRepository.findByName(username);

        if (userAlreadyExist) {
            throw new Error("Username already exists!");
        }

        this.usersRepository.create({ username, name, email, phone });
    }
}

export { CreateUserService };