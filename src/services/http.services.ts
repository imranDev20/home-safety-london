import axios, { AxiosError, AxiosResponse } from "axios";

const http = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_BASE_URL}`,
  timeout: 10000,
});

// Add a request interceptor to add the token to every request
http.interceptors.request.use(
  (config) => {
    // Retrieve the token from wherever it's stored (e.g., localStorage, Vuex store, etc.)
    const token = localStorage.getItem("accessToken");

    // If a token exists, add it to the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error: AxiosError) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

// Add a response interceptor to handle errors globally
http.interceptors.response.use(
  (response: AxiosResponse) => {
    // If the request was successful, return the response
    return response;
  },
  (error: AxiosError) => {
    // Handle any response errors
    if (error.response) {
      // The request was made and the server responded with a status code that falls out of the range of 2xx
      console.error("Response error:", error.response.data);
    } else if (error.request) {
      // The request was made but no response was received
      console.error("Request error:", error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error("Error:", error.message);
    }

    return Promise.reject(error);
  }
);

export default http;
