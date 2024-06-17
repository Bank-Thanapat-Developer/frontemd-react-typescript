import axios from "axios";
// import { getToken } from '../utils/token';

axios.defaults.baseURL = "http://localhost:8080"; // URL ของเซิร์ฟเวอร์ backend

// axios.interceptors.request.use((config) => {
//   const token = getToken();
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// }, (error) => {
//   return Promise.reject(error);
// });
