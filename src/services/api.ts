import axios from "axios";

const envUrl = process.env.NEXT_PUBLIC_URL;


export const api = axios.create({
  baseURL: envUrl,
});
