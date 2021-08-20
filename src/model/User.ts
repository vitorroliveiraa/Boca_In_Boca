import { v4 as uuidv4 } from "uuid";

class User {
    id?: string;
    created_at: Date;
    username: string;
    score: number;
    level: number;
    name: string;
    email: string;
    phone: string;

    constructor() {
        if (!this.id) {
            this.id = uuidv4();
        }
    }
}

export { User };