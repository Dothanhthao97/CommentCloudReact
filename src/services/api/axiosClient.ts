// src/api/axiosClient.ts
import axios from "axios";

// Nếu đang chạy ở local dev (http://localhost), thì dùng domain thật để gọi API
const isLocal = window.location.hostname === "localhost";

const axiosClient = axios.create({
  baseURL: isLocal
    ? "https://dpmclouddev.vuthao.com" // dùng domain thật để gọi API khi chạy local
    : window.location.origin, // còn lại thì dùng domain hiện tại (prod/uat)
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;
