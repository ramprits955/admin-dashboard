import { AuthProvider } from "@pankod/refine-core";

import axios, { AxiosInstance } from "axios";
import { Common } from "../constants/common";

export const authProvider = (axiosInstance: AxiosInstance): AuthProvider => {
    return {
        login: async ({
            user,
        }: {
            user: { email: string; password: string };
        }) => {
            try {
                const { data } = await axios.post(`${Common.API_URL}/users/login`, {
                    user,
                });

                localStorage.setItem(Common.TOKEN_KEY, data.user.token);
            } catch (error) {
                return Promise.reject(error);
            }

            return Promise.resolve("/");
        },
        logout: (props) => {
            localStorage.removeItem(Common.TOKEN_KEY);
            return Promise.resolve(props?.redirectPath);
        },
        checkError: (error) => {
            if (error?.response?.status === 401) {
                return Promise.reject("/register");
            }
            return Promise.resolve();
        },
        checkAuth: () => localStorage.getItem(Common.TOKEN_KEY) ? Promise.resolve() : Promise.reject(),
        getPermissions: () => Promise.resolve(),
        getUserIdentity: async () => {
            const token = localStorage.getItem(Common.TOKEN_KEY);
            if (!token) {
                return Promise.reject();
            }

            const userInfo = await axiosInstance.get(`${Common.API_URL}/user`);

            return Promise.resolve(userInfo.data.user);
        },
    };
};