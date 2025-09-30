import client from './client';
import { Project } from '../types';

export const projectsAPI = {
    getProjects: async (): Promise<Project[]> => {
        const response = await client.get('/projects');
        return response.data;
    },

    getProject: async (id: string): Promise<Project> => {
        const response = await client.get(`/projects/${id}`);
        return response.data;
    },

    createProject: async (project: Omit<Project, '_id' | 'owner' | 'createdAt' | 'updatedAt'>): Promise<Project> => {
        const response = await client.post('/projects', project);
        return response.data;
    },

    updateProject: async (id: string, project: Partial<Project>): Promise<Project> => {
        const response = await client.patch(`/projects/${id}`, project);
        return response.data;
    },

    deleteProject: async (id: string): Promise<void> => {
        await client.delete(`/projects/${id}`);
    },
};