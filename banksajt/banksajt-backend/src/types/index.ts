export interface User {
    id: number;
    username: string;
    password: string;
}

export interface Account {
    id: number;
    userId: number;
    amount: number;
}

export interface Session {
    userId: number;
    token: string;
}
