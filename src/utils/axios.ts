
import axios from 'axios';

axios.defaults.timeout = 30000;

axios.defaults.withCredentials = true;

axios.interceptors.request.use(async (config) => {
    return config
}, error => {
    return Promise.reject(error)
});

axios.interceptors.response.use(async (res) => {
    return res;
}, async (error) => {
    return Promise.reject(error);
})

export default axios;