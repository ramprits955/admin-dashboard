import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { Common } from '../constants/common';
import { User, UserLoginForm, UserRegisterLoginForm, ChangePassword } from '../model/user';


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
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Account = {
    current: () => requests.get<User>('/api/v1/db/auth/user/me'),
    login: (user: UserLoginForm) => requests.post<User>('/api/v1/db/auth/user/signin', user),
    register: (user: UserRegisterLoginForm) => requests.post<User>('/api/v1/db/auth/user/signup', user),
    refreshToken: () => requests.post<User>('/api/v1/db/auth/token/refresh', {}),
    forgotPassword: (email: string) => requests.post<User>('/api/v1/db/auth/password/forgot', { email }),
    passwordChange: (changePassword: ChangePassword) => requests.post<User>('/api/v1/db/auth/password/change', changePassword),
    verifyEmail: (token: string) =>
        requests.post<void>(`http://localhost:8080/api/v1/db/auth/email/validate/${token}`, {}),
    resendEmailConfirm: (email: string) =>
        requests.get(`/account/resendEmailConfirmationLink?email=${email}`)
}

export default {
    Account
}