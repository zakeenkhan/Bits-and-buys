import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3008/api", // adjust as per your server
  withCredentials: false, // unless using cookies
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
