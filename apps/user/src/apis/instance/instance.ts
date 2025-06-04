import axios from 'axios';

export const teka = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const tekaWithFile = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  timeout: 15000,
});

teka.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
