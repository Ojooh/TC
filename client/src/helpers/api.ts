import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:4000/TC/api/v1',
    withCredentials: true,
});

export default instance;