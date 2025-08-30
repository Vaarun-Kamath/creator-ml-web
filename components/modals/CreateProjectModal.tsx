import React, { useState } from 'react'
import { createProject } from '../../app/services/projectService';
import { ProjectType } from '@/types';

function CreateProjectModal({ onCreateProject, userId, onRefresh, setIsModalOpen }: {
    onCreateProject: (project: ProjectType) => void;
    userId: string;
    onRefresh: () => Promise<void>;
    setIsModalOpen: (isOpen: boolean) => void;
}) {
    const [projectTitle, setProjectTitle] = useState<string>('');
    const [isCreating, setIsCreating] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!projectTitle.trim()) return;

        setIsCreating(true);
        setError(null);

        try {
            const newProject = await createProject(projectTitle.trim(), userId);

            if (onCreateProject) {
                onCreateProject(newProject);
            }

            if (onRefresh) {
                await onRefresh();
            }

            setProjectTitle('');
            setIsModalOpen(false);
        } catch (err: any) {
            console.error('Error creating project:', err);
            setError(err.message || 'Failed to create project');
        } finally {
            setIsCreating(false);
        }
    };

    const handleClose = () => {
        if (!isCreating) {
            setIsModalOpen(false);
            setProjectTitle('');
            setError(null);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop with blur effect */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={handleClose}
            />

            {/* Modal content */}
            <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full mx-4 p-6 transform transition-all">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Create New Project
                    </h2>
                    <button
                        onClick={handleClose}
                        disabled={isCreating}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 disabled:opacity-50"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Project Title
                        </label>
                        <input
                            id="projectTitle"
                            type="text"
                            value={projectTitle}
                            onChange={(e) => setProjectTitle(e.target.value)}
                            placeholder="Enter project title..."
                            disabled={isCreating}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-50 disabled:cursor-not-allowed"
                            required
                        />
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="text-red-600 dark:text-red-400 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                            {error}
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            type="button"
                            onClick={handleClose}
                            disabled={isCreating}
                            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isCreating || !projectTitle.trim()}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed rounded-md transition-colors flex items-center space-x-2"
                        >
                            {isCreating && (
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            )}
                            <span>{isCreating ? 'Creating...' : 'Create Project'}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreateProjectModal