export type User = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}

export type UserLoginForm = {
    email: string;
    password: string
}

export type UserRegisterLoginForm = {
    firstName: string;
    lastName: string;
    email: string;
    password: string
}


export type ChangePassword = {
    currentPassword: string;
    newPassword: string;
}
