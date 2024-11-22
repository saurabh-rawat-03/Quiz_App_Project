import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


export const api = axios.create({
    baseURL : import.meta.env.VITE_API_URL ||"http://localhost:4000",
    timeout : 10000,
    headers : {
        "Content-Type" : "application/json",
    },
});

api.interceptors.request.use(
    (config : InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if(token){
            config.headers.Authorization = 'Bearer${token}';
        }
        return config;
    },(error : AxiosError) =>{
        return Promise.reject(error);
    }
);