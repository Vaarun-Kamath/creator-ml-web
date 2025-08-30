'use client';

import { useState, useEffect } from 'react';
import ProjectCard from '../../components/cards/ProjectCard';
import CreateProjectButton from '../../components/buttons/CreateProjectButton';
import { getProjects } from '../services/projectService';
import { ProjectType } from '@/types';

export default function Dashboard() {
    // Mock user ID - replace with real authentication later
    const userId = "User1";

    const [projects, setProjects] = useState<Array<ProjectType>>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch projects when component mounts
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                setLoading(true);
                setError(null);
                const fetchedProjects = await getProjects(userId);
                setProjects(fetchedProjects);
            } catch (err: any) {
                console.error('Error fetching projects:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, [userId]);

    const handleCreateProject = (newProject: ProjectType) => {
        setProjects(prev => [newProject, ...prev]);
    };

    const refreshProjects = async () => {
        try {
            const fetchedProjects = await getProjects(userId);
            setProjects(fetchedProjects);
        } catch (err: any) {
            console.error('Error refreshing projects:', err);
        }
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
                        <CreateProjectButton
                            onCreateProject={handleCreateProject}
                            userId={userId}
                            onRefresh={refreshProjects}
                        />
                    </div>
                </div>

                {/* Projects Grid */}
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {projects.map((project) => (
                            <ProjectCard key={project._id} project={{
                                _id: project._id,
                                title: project.title,
                                updatedAt: project.updatedAt,
                            }} />
                        ))}
                    </div>
                ) : loading ? (
                    <div className="flex items-center justify-center py-12">
                        <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                            <span className="text-gray-600">Loading projects...</span>
                        </div>
                    </div>
                ) : error ? (
                    <div className="text-center py-12">
                        <div className="mx-auto h-12 w-12 text-red-400 mb-4">
                            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h3 className="text-lg font-medium text-gray-900 mb-2">Error loading projects</h3>
                        <p className="text-gray-500 mb-6">{error}</p>
                        <button
                            onClick={refreshProjects}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                        >
                            Try Again
                        </button>
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
                    </div>
                )}
            </div>
        </div>
    );
}
