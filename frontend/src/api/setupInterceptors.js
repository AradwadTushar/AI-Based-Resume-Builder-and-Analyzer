import axiosClient from "./axiosClient";

export const setupInterceptors = (getToken) => {
  axiosClient.interceptors.request.use(
    async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosClient.interceptors.response.use(
    (response) => {
      if (response.config?.url?.includes("/api/ai/")) {
        window.dispatchEvent(new CustomEvent("ai-quota-consumed"));
      }
      return response;
    },
    (error) => {
      if (
        error.response?.status === 403 &&
        typeof error.response?.data?.detail === "string" &&
        error.response.data.detail.toLowerCase().includes("limit")
      ) {
        window.dispatchEvent(new CustomEvent("ai-quota-exceeded"));
      }
      return Promise.reject(error);
    }
  );
};