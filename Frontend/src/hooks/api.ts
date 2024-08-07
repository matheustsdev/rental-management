import axios from "axios";

export const api = axios.create({
    baseURL: "https://localhost:7024/api",
    headers: {
        "Content-Type": "application",
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*"
    }
});