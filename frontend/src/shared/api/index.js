import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000/api'
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('cartToken');

    if(token) {
        config.headers['X-Cart-Token'] = token;
    }

    return config;
});

export default api;