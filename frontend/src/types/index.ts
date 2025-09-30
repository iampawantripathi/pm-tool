export interface User {
    id: string;
    email: string;
    name?: string;
}

export interface Project {
    _id: string;
    title: string;
    description?: string;
    status: 'active' | 'completed';
    owner: string;
    createdAt: string;
    updatedAt: string;
}

export interface Task {
    _id: string;
    title: string;
    description?: string;
    status: 'todo' | 'in-progress' | 'done';
    dueDate?: string;
    project: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthResponse {
    access_token: string;
    user?: User;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    email: string;
    password: string;
    name?: string;
}