import axios, { AxiosRequestConfig } from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3333',
});

api.interceptors.request.use((config: AxiosRequestConfig): any => {
  console.log('REQUEST', {
    url: 'http://10.0.2.2:3333' + config.url,
    body: config.data,
  });

  return config;
});

export { api };
