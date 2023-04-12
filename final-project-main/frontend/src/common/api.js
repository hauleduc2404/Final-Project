import axios from 'axios'

const axiosInstance = axios.create()
axiosInstance.interceptors.request.use(function (config) {
  config.baseURL = window.BASE_API
  // Do something before request is sent
  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

export { axiosInstance }
