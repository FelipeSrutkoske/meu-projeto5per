import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000", // ajuste se sua API estiver em outro endereço
});

export default api;
