import axios from "axios";
import { StorageKeys } from "../constants/storage-keys";

console.log(import.meta.env.VITE_API_HOST)
console.log(import.meta.env.VITE_API_PORT)
console.log(import.meta.env.VITE_API_ENDPOINT)

const api = axios.create({
    baseURL: `http://${import.meta.env.VITE_API_HOST}:${import.meta.env.VITE_API_PORT}${import.meta.env.VITE_API_ENDPOINT}`,
    headers: { "Content-Type": "application/json" },
    timeout: 20000,
})

api.interceptors.request.use((config) => {
    const token = localStorage.getItem(StorageKeys.TOKEN);
    
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

export { api }  