import axios from 'axios';

const api = axios.create({
    // URl BACKEND
    baseURL: 'http://localhost:3000'
});

export default api;