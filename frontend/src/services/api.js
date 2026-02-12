import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add JWT token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error.response ? error.response.status : null;
        if (status === 401) {
            localStorage.removeItem('token');
            // window.location.href = '/login'; 
        }

        if (error.response) {
            console.error('API Error Response:', error.response.data);
            console.error('API Error Status:', error.response.status);
            console.error('API Error Headers:', error.response.headers);
        } else if (error.request) {
            console.error('API Error Request (No Response):', error.request);
        } else {
            console.error('API Error Message:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
