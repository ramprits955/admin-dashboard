export type LoginForm = {
    email: string;
    password: string
}

export type RegisterForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export type ChangePassword = {
    currentPassword: string;
    newPassword: string;
}

export interface Roles {
    user: boolean;
    super: boolean;
}

export interface User {
    id: string;
    email: string;
    email_verified?: any;
    firstname?: any;
    lastname?: any;
    roles: Roles;
    isAuthorized: boolean;
}


