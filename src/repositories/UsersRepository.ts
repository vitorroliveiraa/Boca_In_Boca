import { User } from "../model/Users";

class UsersRepository {
    private users: User[];

    constructor() {
        this.users = [];
    }

    list(): User[] {
        return this.users;
    }
}

export { UsersRepository };