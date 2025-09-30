import client from './client';
import { Task } from '../types';

export const tasksAPI = {
    getTasks: async (projectId: string, status?: string): Promise<Task[]> => {
        const response = await client.get(`/tasks/project/${projectId}`, {
            params: { status }
        });
        return response.data;
    },

    createTask: async (task: Omit<Task, '_id' | 'createdAt' | 'updatedAt'>): Promise<Task> => {
        const response = await client.post('/tasks', task);
        return response.data;
    },

    updateTask: async (id: string, task: Partial<Task>): Promise<Task> => {
        const response = await client.patch(`/tasks/${id}`, task);
        return response.data;
    },

    deleteTask: async (id: string): Promise<void> => {
        await client.delete(`/tasks/${id}`);
    },
};