'use client';

import { useState } from 'react';

export default function CreateProjectButton({ onCreateProject }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectTitle, setProjectTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (projectTitle.trim()) {
            // For now, just create a mock project
            const newProject = {
                id: Date.now().toString(),
                title: projectTitle.trim(),
                lastUpdated: new Date().toISOString()
            };

            if (onCreateProject) {
                onCreateProject(newProject);
            }

            setProjectTitle('');
            setIsModalOpen(false);
        }
    };

    return (
        <>
            <button
                onClick={() => setIsModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 flex items-center gap-2"
            >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create New Project
            </button>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
                        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Project</h2>

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label htmlFor="projectTitle" className="block text-sm font-medium text-gray-700 mb-2">
                                    Project Title
                                </label>
                                <input
                                    type="text"
                                    id="projectTitle"
                                    value={projectTitle}
                                    onChange={(e) => setProjectTitle(e.target.value)}
                                    placeholder="e.g., How to Bake Sourdough Bread"
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                                >
                                    Create Project
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
