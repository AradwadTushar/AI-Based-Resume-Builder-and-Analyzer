import axiosClient from "./axiosClient";

export const setupInterceptors = (getToken) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      console.log("Interceptor running");

const token = await getToken();

console.log("TOKEN:", token);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};