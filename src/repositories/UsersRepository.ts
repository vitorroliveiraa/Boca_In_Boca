import { User } from "../model/User";
import { IUserRepository, ICreateUserDTO } from "./IUserRepository";

class UsersRepository implements IUserRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    list(): User[] {
        return this.users;
    }

    create({ username, name, email, phone }: ICreateUserDTO): void {
        const user = new User();

        Object.assign(user, {
            created_at: new Date(),
            username,
            score: 0,
            level: 0,
            name,
            email,
            phone
        });

        this.users.push(user);
    }

    findByName(name: string): User {
        const userExist = this.users.find(
            (user) => user.username === name
        );

        return userExist;
    }
}

export { UsersRepository };