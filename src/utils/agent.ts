import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { User, LoginForm, RegisterForm, ChangePassword } from '../model/user';
import { Common } from '../constants/common';


export const axiosInstance = axios.create({ baseURL: Common.API_URL });

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const token = localStorage.getItem(Common.TOKEN_KEY);
    if (token) {
        if (request.headers) {
            request.headers["xc-auth"] = `${token}`;
        } else {
            request.headers = {
                'xc-auth': `${token}`,
            };
        }
    }
    return request;
});
const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const requests = {
    get: <T>(url: string) => axiosInstance.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axiosInstance.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axiosInstance.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axiosInstance.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/api/v1/db/auth/user/me'),
    login: (user: LoginForm) => requests.post<{ token: string }>('/api/v1/db/auth/user/signin', user),
    register: (user: RegisterForm) => requests.post<User>('/api/v1/db/auth/user/signup', user),
    refreshToken: () => requests.post<User>('/api/v1/db/auth/token/refresh', {}),
    forgotPassword: (email: string) => requests.post<User>('/api/v1/db/auth/password/forgot', { email }),
    passwordChange: (changePassword: ChangePassword) => requests.post<User>('/api/v1/db/auth/password/change', changePassword),
    verifyEmail: (token: string) =>
        requests.post<void>(`/api/v1/db/auth/email/validate/${token}`, {}),
    resendEmailConfirm: (email: string) =>
        requests.get(`/account/resendEmailConfirmationLink?email=${email}`)
}

const Attachment = {
    upload: (files: Blob) => requests.post('/api/v1/db/storage/upload', {}),
}



const agent = {
    Account, Attachment
}
export default agent