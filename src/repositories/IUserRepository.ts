import { User } from "../model/User";

interface ICreateUserDTO {
    username: string;
    name: string;
    email: string;
    phone: string;
}

interface IUserRepository {
    list(): User[];
    create({ username, name, email, phone }: ICreateUserDTO): void;
    findByName(username: string): User;
}

export { IUserRepository, ICreateUserDTO };