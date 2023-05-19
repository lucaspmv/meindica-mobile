import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'https://meindica-server-api.onrender.com',
});

api.interceptors.request.use((config: AxiosRequestConfig): any => {
  // console.log('REQUEST', {
  //   url: 'https://meindica-server-api.onrender.com' + config.url,
  //   body: config.data,
  // });

  return config;
});

export { api };
