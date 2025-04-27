import axios from "axios";

// Configura a URL base para usar o proxy
const api = axios.create({
  baseURL: "/api", // O proxy redirecionará para http://127.0.0.1:8000
});

export default api;