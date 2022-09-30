import axios from "axios";

export const http = axios.create({
  baseURL: "https://api-staging.wawupc.ga/api/v1",
  headers: {
    "Content-type": "application/json",
  },
});

// Setup middleware for axios to use the JWT token when available
http.interceptors.request.use(
  config => {
    const token = localStorage.getItem("user-token").trim();

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete http.defaults.headers.common["Authorization"];
    }

    return config;
  },
  error => Promise.reject(error)
);
