import axios from 'axios';

const config = {
  baseURL: 'http://localhost:5252/',
  headers: {
    'Content-Type': 'application/json',
  },
};
const configUser = {
  baseURL: 'http://localhost:5252/',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

export const axiosNoAuthInstance = axios.create(config);
export const axiosInstance = axios.create(config);
export const axiosUserInstance = axios.create(configUser);

axiosInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
axiosUserInstance.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);
