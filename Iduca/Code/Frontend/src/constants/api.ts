import axios from "axios";

export const API_HOST = process.env.NEXT_PUBLIC_API_HOST;
export const API_PORT = process.env.NEXT_PUBLIC_API_PORT;
export const API_ENP = process.env.NEXT_PUBLIC_API_ENP;
// export const BASE_URL = "";

export const api = axios.create({
    baseURL: `http://${API_HOST}:${API_PORT}/${API_ENP}`
})