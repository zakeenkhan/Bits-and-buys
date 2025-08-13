import axios from 'axios';

// Determine the base URL based on the environment
const baseURL = process.env.NODE_ENV === 'production'
  ? process.env.REACT_APP_API_URL || '/api'  // Use relative path in production
  : 'http://localhost:5004/api';  // Use localhost in development

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000, // 10 seconds timeout
  withCredentials: false, // Set to true if using cookies for authentication
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for adding auth token if available
axiosInstance.interceptors.request.use(
  (config) => {
    // Add auth token if available
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Handle common errors (401, 403, 404, 500, etc.)
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      switch (error.response.status) {
        case 401:
          // Handle unauthorized (e.g., redirect to login)
          console.error('Unauthorized access - please log in');
          break;
        case 403:
          // Handle forbidden
          console.error('You do not have permission to access this resource');
          break;
        case 404:
          // Handle not found
          console.error('The requested resource was not found');
          break;
        case 500:
          // Handle server error
          console.error('A server error occurred');
          break;
        default:
          console.error('An error occurred:', error.message);
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
