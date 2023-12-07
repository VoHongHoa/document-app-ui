import axios, { AxiosInstance, InternalAxiosRequestConfig } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api",
});
//axios.defaults.headers.common["Authorization"] = AUTH_TOKEN;
instance.interceptors.response.use((response) => {
  return response;
}, function (error) {
  return Promise.reject(error);
});
instance.interceptors.request.use(function (
  config: InternalAxiosRequestConfig<any>
) {
  const token: string | null = localStorage.getItem("access_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});
export default instance;
