import { getCookie, removeCookie, setCookie } from '@/utils/cookies';
import axios from 'axios';
import type { Axios, AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { updateRefresh } from './auth/refresth';

export const instance: Axios = axios.create({
  baseURL: 'http://223.195.111.30:5062',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    Accept: '*/*',
  },
  timeout: 3000,
});



instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = getCookie('token') as string;
    if (config && config.headers) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (process.env.NODE_ENV === 'development') {
      // const { method, url } = config;
      // console.log(`🚀 [API] ${method?.toUpperCase()} ${url} | Request`);
    }
    return config;
  },
  (error: AxiosError | Error): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => {
    return response;
  },
  async (error: AxiosError | Error): Promise<any> => {
    if (process.env.NODE_ENV === 'development') {
      if (axios.isAxiosError(error) && error.config) {
        const { message } = error;
        const { method, url } = error.config as InternalAxiosRequestConfig;
        const { status, statusText } = error.response as AxiosResponse;

    
        if ((status == 401 || status == 419) && url !== '/reissue') {
          console.log('error', url);
          try {
            const refreshResponse = await updateRefresh();

            if (
              refreshResponse &&
              typeof refreshResponse.data.data.accessToken === 'string'
            ) {
              const token = refreshResponse.data.data.accessToken;
              setCookie('token', token);
              error.config.headers.Authorization = `Bearer ${token}`;
              console.log(`리프레쉬 로직 작동  ${token}`);
              return instance.request(error.config);
            } else {
              throw new Error('Refresh token is null');
            }
          } catch (refreshError) {
            removeCookie('refreshToken');

            // window.location.href = '/';
            return Promise.reject(refreshError);
          }
        } else {
          console.error(
            `❌ [API] ${method?.toUpperCase()} ${url} | Response Error: ${status} ${statusText} | ${message}`
          );
        }
      }
      return Promise.reject(error);
    }
  }
);