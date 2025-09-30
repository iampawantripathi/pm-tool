import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { projectsAPI } from '../api/projects';
import { Project } from '../types';

const Dashboard: React.FC = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const data = await projectsAPI.getProjects();
                setProjects(data);
            } catch (err: any) {
                setError('Failed to fetch projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                {error}
            </div>
        );
    }

    const activeProjects = projects.filter(p => p.status === 'active');
    const completedProjects = projects.filter(p => p.status === 'completed');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-2 text-gray-600">Welcome to your project management dashboard</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Total Projects</dt>
                        <dd className="mt-1 text-3xl font-semibold text-gray-900">{projects.length}</dd>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Active Projects</dt>
                        <dd className="mt-1 text-3xl font-semibold text-green-600">{activeProjects.length}</dd>
                    </div>
                </div>

                <div className="bg-white overflow-hidden shadow rounded-lg">
                    <div className="px-4 py-5 sm:p-6">
                        <dt className="text-sm font-medium text-gray-500 truncate">Completed Projects</dt>
                        <dd className="mt-1 text-3xl font-semibold text-blue-600">{completedProjects.length}</dd>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Recent Projects</h3>
                    <Link
                        to="/projects"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        View All Projects
                    </Link>
                </div>
                <ul className="divide-y divide-gray-200">
                    {projects.slice(0, 5).map((project) => (
                        <li key={project._id}>
                            <Link to={`/projects/${project._id}`} className="block hover:bg-gray-50">
                                <div className="px-4 py-4 sm:px-6">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center">
                                            <p className="text-sm font-medium text-blue-600 truncate">
                                                {project.title}
                                            </p>
                                            <span
                                                className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === 'active'
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-blue-100 text-blue-800'
                                                    }`}
                                            >
                                                {project.status}
                                            </span>
                                        </div>
                                        <div className="text-sm text-gray-500">
                                            {new Date(project.createdAt).toLocaleDateString()}
                                        </div>
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-600 line-clamp-2">
                                            {project.description || 'No description'}
                                        </p>
                                    </div>
                                </div>
                            </Link>
                        </li>
                    ))}
                </ul>
                {projects.length === 0 && (
                    <div className="px-4 py-12 text-center">
                        <p className="text-gray-500">No projects found. Create your first project!</p>
                        <Link
                            to="/projects"
                            className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                        >
                            Create Project
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;