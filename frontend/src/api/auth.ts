import client from './client';
import { AuthResponse, LoginCredentials, RegisterCredentials } from '../types';

export const authAPI = {
    login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
        const response = await client.post('/auth/login', credentials);
        return response.data;
    },
    

    register: async (credentials: RegisterCredentials): Promise<AuthResponse> => {
        const response = await client.post('/auth/register', credentials);
        return response.data;
    },
};