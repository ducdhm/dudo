import axios from 'axios';
import { API_URL } from './constants';

const axiosInstance = axios.create({
    baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
    (config) => {
        // Do something before request is sent
        
        return config;
    },
    (error) => {
        // Do something with request error
        
        return Promise.reject(error);
    },
);

axiosInstance.interceptors.response.use(
    (response) => {
        
        return response.data;
    },
    (error) => {

        return Promise.reject(error);
    },
);

export default axiosInstance;
