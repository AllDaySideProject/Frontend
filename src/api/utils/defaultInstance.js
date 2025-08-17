import axios from "axios";
const BASE_URL = "https://52.78.244.98.nip.io/api/";

export const defaultInstance = axios.create({
  baseURL: BASE_URL,
});