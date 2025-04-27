import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKED_URL,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("auth_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export async function login(email: string, password: string) {
  const response = await api.post("/api/login", { email, password });
  return response.data;
}

export async function getUser() {
  try {
    const response = await api.get("/api/user");
    return response.data;
  } catch (error) {
    throw error;
  }
}
