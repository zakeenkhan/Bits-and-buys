import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5004/api", // Backend server URL
  withCredentials: false, // unless using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
