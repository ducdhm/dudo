import axios from 'axios/index';

const request = (config) => {
    let storedJwt = localStorage.getItem('jwt');
    config.headers = config.headers || {};
    config.headers.Authorization = config.headers.Authorization || storedJwt;
    
    return axios(config);
};

export default request;

