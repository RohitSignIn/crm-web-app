import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  timeout: import.meta.env.VITE_API_TIMEOUT,
  headers: {
    "x-access-token": localStorage.getItem("token")
      ? localStorage.getItem("token")
      : "",
  },
});

export default api;
