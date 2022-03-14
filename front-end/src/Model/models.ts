// Interface for the user Context
export interface IUserContext{
    username: string | undefined;
    token: string | undefined;
    id: string | undefined;
}

export interface IAuthCredentials{
    email?: string | undefined;
    username?: string | undefined;
    password?: string | undefined;
    passwordRepeat?: string | undefined;
    
}
