'use client';

import { useState } from 'react';
import ProjectCard from '../../components/ProjectCard';
import CreateProjectButton from '../../components/CreateProjectButton';

export default function Dashboard() {
    // Mock data for projects
    const [projects, setProjects] = useState([
        {
            id: '1',
            title: 'How to Bake Sourdough Bread',
            lastUpdated: '2025-08-20T10:30:00Z'
        },
        {
            id: '2',
            title: 'Ultimate Guide to Home Workouts',
            lastUpdated: '2025-08-19T15:45:00Z'
        },
        {
            id: '3',
            title: 'Digital Marketing for Beginners',
            lastUpdated: '2025-08-18T09:15:00Z'
        },
        {
            id: '4',
            title: 'Photography Tips for Content Creators',
            lastUpdated: '2025-08-17T14:20:00Z'
        }
    ]);

    const handleCreateProject = (newProject) => {
        setProjects(prev => [newProject, ...prev]);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Projects</h1>
                        <p className="text-gray-600">
                            Manage your video projects and access all CreatorML tools
                        </p>
                    </div>
                    <div className="mt-4 sm:mt-0">
                        <CreateProjectButton onCreateProject={handleCreateProject} />
                    </div>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-gray-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No projects yet</h3>
                        <p className="text-gray-500 mb-6">Get started by creating your first video project</p>
                        <CreateProjectButton onCreateProject={handleCreateProject} />
                    </div>
                )}
            </div>
        </div>
    );
}
