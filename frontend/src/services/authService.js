import api from './api';
import { jwtDecode } from 'jwt-decode';

const register = async (userData) => {
    const response = await api.post('/users/register', userData);
    return response.data;
};

const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('token');
};

const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (token) {
        try {
            return jwtDecode(token);
        } catch (error) {
            console.error("Invalid token", error);
            return null;
        }
    }
    return null;
};

const authService = {
    register,
    login,
    logout,
    getCurrentUser,
};

export default authService;
