import axios from "axios";

const isDev = true;
const ProductionURL = "https://defeat.futurixai.com/";
const DevelopmentURL = "http://localhost:5000";

const axiosClient = axios.create({
  baseURL: isDev ? DevelopmentURL : ProductionURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // Add this line
});

axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken"); // Change "token" to "authToken" to match your login.jsx
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Change "Authorization" to "Authorization" to match the code block
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosClient;
