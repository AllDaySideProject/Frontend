import axios from "axios";

const BASE_URL = `https://52.78.244.98.nip.io/api/`;

const defaultInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json; charset=UTF-8',
  }
})

export default defaultInstance;