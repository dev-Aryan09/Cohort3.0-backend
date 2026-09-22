import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

export default function useApi() {
  const context = useAuthContext();

  const api = axios.create({
    // baseURL: "http://localhost:3000/api",  // redirecting to express's server

    baseURL: "http://localhost:5173/api", // redirecting to vite's server
    withCredentials: true, // cookie data will be sent with request
  });

  api.interceptors.request.use(
    (config) => {
      config.headers.Authorization = `Bearer ${context.accessToken}`;
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );

  return api;
}
