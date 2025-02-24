// services/axiosInstance.ts
import axios, {
  type AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";



// Function to get token from localStorage
const getToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("custom-auth-token");
  }
  return null;
};

// Create an Axios instance
const axiosInstance: AxiosInstance = axios.create({
  baseURL:  import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the token in the headers
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

const redirectToSignIn = () => {
  if (typeof window !== "undefined") {
    window.localStorage.removeItem("custom-auth-token");
    window.location.href = '/';
  }
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      redirectToSignIn();
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
