// Interface for the user Context
export interface IUserContext{
    username: string;
    token: string;
    id: string;
}

export interface IAuthCredentials{
    email?: string;
    username?: string
    password?: string
    confirmPassword?: string;
}
