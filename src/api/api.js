import axios from "axios";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

api.interceptors.request.use((req) => {
  req.headers["Content-Type"] = "application/json";
  return req;
});

export default api;
