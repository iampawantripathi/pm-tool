import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { projectsAPI } from '../api/projects';
import { tasksAPI } from '../api/tasks';
import { Project, Task } from '../types';

const ProjectDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [project, setProject] = useState<Project | null>(null);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [statusFilter, setStatusFilter] = useState('');
    const [showTaskForm, setShowTaskForm] = useState(false);
    const [taskFormData, setTaskFormData] = useState({
        title: '',
        description: '',
        status: 'todo' as 'todo' | 'in-progress' | 'done',
        dueDate: ''
    });

    const fetchProjectAndTasks = async () => {
        if (!id) return;

        try {
            const [projectData, tasksData] = await Promise.all([
                projectsAPI.getProject(id),
                tasksAPI.getTasks(id, statusFilter || undefined)
            ]);
            setProject(projectData);
            setTasks(tasksData);
        } catch (err: any) {
            setError('Failed to fetch project details');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (id) {
            fetchProjectAndTasks();
        }
    }, [id, statusFilter]);

    const handleCreateTask = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!id) return;

        try {
            await tasksAPI.createTask({
                ...taskFormData,
                project: id
            });
            setShowTaskForm(false);
            setTaskFormData({ title: '', description: '', status: 'todo', dueDate: '' });
            fetchProjectAndTasks(); // Refresh tasks
        } catch (err: any) {
            setError('Failed to create task');
        }
    };

    const handleUpdateTaskStatus = async (taskId: string, newStatus: Task['status']) => {
        try {
            await tasksAPI.updateTask(taskId, { status: newStatus });
            fetchProjectAndTasks(); // Refresh tasks
        } catch (err: any) {
            setError('Failed to update task');
        }
    };

    const handleDeleteTask = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            try {
                await tasksAPI.deleteTask(taskId);
                fetchProjectAndTasks(); // Refresh tasks
            } catch (err: any) {
                setError('Failed to delete task');
            }
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'todo':
                return 'bg-gray-100 text-gray-800';
            case 'in-progress':
                return 'bg-yellow-100 text-yellow-800';
            case 'done':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-900">{project.title}</h1>
                <p className="mt-2 text-gray-600">{project.description}</p>
                <div className="mt-4 flex items-center space-x-4">
                    <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${project.status === 'active'
                                ? 'bg-green-100 text-green-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                    >
                        {project.status}
                    </span>
                    <span className="text-sm text-gray-500">
                        Created {new Date(project.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {error && (
                <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    {error}
                </div>
            )}

            <div className="mb-6 flex justify-between items-center">
                <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
                <div className="flex space-x-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        <option value="">All Status</option>
                        <option value="todo">To Do</option>
                        <option value="in-progress">In Progress</option>
                        <option value="done">Done</option>
                    </select>
                    <button
                        onClick={() => setShowTaskForm(true)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
                    >
                        Create Task
                    </button>
                </div>
            </div>

            {/* Task Form Modal */}
            {showTaskForm && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
                    <div className="relative top-20 mx-auto p-5 border w-full max-w-md shadow-lg rounded-md bg-white">
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900">Create New Task</h3>
                            <form onSubmit={handleCreateTask} className="mt-4 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={taskFormData.title}
                                        onChange={(e) => setTaskFormData({ ...taskFormData, title: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        value={taskFormData.description}
                                        onChange={(e) => setTaskFormData({ ...taskFormData, description: e.target.value })}
                                        rows={3}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Status</label>
                                    <select
                                        value={taskFormData.status}
                                        onChange={(e) => setTaskFormData({ ...taskFormData, status: e.target.value as any })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    >
                                        <option value="todo">To Do</option>
                                        <option value="in-progress">In Progress</option>
                                        <option value="done">Done</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Due Date</label>
                                    <input
                                        type="date"
                                        value={taskFormData.dueDate}
                                        onChange={(e) => setTaskFormData({ ...taskFormData, dueDate: e.target.value })}
                                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                    />
                                </div>
                                <div className="flex justify-end space-x-3">
                                    <button
                                        type="button"
                                        onClick={() => setShowTaskForm(false)}
                                        className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700"
                                    >
                                        Create
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            )}

            {/* Tasks List */}
            <div className="bg-white shadow overflow-hidden sm:rounded-md">
                <ul className="divide-y divide-gray-200">
                    {tasks.map((task) => (
                        <li key={task._id}>
                            <div className="px-4 py-4 sm:px-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <h3 className="text-sm font-medium text-gray-900">
                                            {task.title}
                                        </h3>
                                        <span
                                            className={`ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(
                                                task.status
                                            )}`}
                                        >
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="flex space-x-2">
                                        <select
                                            value={task.status}
                                            onChange={(e) => handleUpdateTaskStatus(task._id, e.target.value as Task['status'])}
                                            className="text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                                        >
                                            <option value="todo">To Do</option>
                                            <option value="in-progress">In Progress</option>
                                            <option value="done">Done</option>
                                        </select>
                                        <button
                                            onClick={() => handleDeleteTask(task._id)}
                                            className="text-red-600 hover:text-red-900 text-sm font-medium"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-600">{task.description}</p>
                                </div>
                                <div className="mt-2 text-sm text-gray-500">
                                    Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : 'No due date'}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
                {tasks.length === 0 && (
                    <div className="px-4 py-12 text-center">
                        <p className="text-gray-500">No tasks found. Create your first task!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;