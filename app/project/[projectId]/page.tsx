import Link from 'next/link';
import { ProjectType } from '@/types';
import KeywordResearch from '../../../components/KeywordResearch';

interface ProjectPageProps {
    params: { projectId: string };
}

// Server-side function to fetch project data
async function getProject(projectId: string): Promise<ProjectType | null> {
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';
    const userId = 'User1'; // Mock userId - in a real app, this would come from authentication

    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'x-user-id': userId,
            },
            cache: 'no-store', // Always fetch fresh data
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.data.project;
    } catch (error) {
        console.error('Error fetching project:', error);
        return null;
    }
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { projectId } = params;
    const project = await getProject(projectId);
    if (!project) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="text-center">
                            <h1 className="text-2xl font-bold text-white mb-4">
                                Project Not Found
                            </h1>
                            <p className="text-gray-400 mb-6">
                                The project you're looking for doesn't exist or you don't have access to it.
                            </p>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                            >
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    {/* Breadcrumb */}
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/dashboard" className="hover:text-blue-600 transition-colors duration-200 flex items-center">
                            <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5v4" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 5v4" />
                            </svg>
                            Dashboard
                        </Link>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900 font-medium">{project.title}</span>
                    </div>

                    {/* Project Info */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                    {project.title}
                                </h1>
                                <p className="text-gray-600 mb-4">
                                    Access all CreatorML tools for this video project. Optimize your content for maximum reach and engagement.
                                </p>
                                <div className="flex items-center text-sm text-gray-500 space-x-6">
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        Created: {formatDate(project.createdAt)}
                                    </div>
                                    <div className="flex items-center">
                                        <svg className="h-4 w-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                        </svg>
                                        Updated: {formatDate(project.updatedAt)}
                                    </div>
                                    <div className="flex items-center">
                                        <div className="h-2 w-2 bg-green-400 rounded-full mr-2"></div>
                                        Active Project
                                    </div>
                                </div>
                            </div>
                            <div className="ml-6">
                                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                                    <div className="text-2xl font-bold text-blue-600">ID</div>
                                    <div className="text-sm text-blue-600 font-mono">{project._id.slice(-8)}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Keyword Research Tool */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Keyword Research Tool</h2>
                    <KeywordResearch projectId={projectId} initialSavedKeywords={project.savedKeywords || []} />
                </div>

                {/* Information Panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Development Status */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-blue-600">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-blue-900">Tools in Development</h3>
                        </div>
                        <p className="text-blue-700 mb-4">
                            We're actively building these powerful AI-driven tools to help content creators optimize their videos and grow their audience. Each tool will provide actionable insights and automation to streamline your workflow.
                        </p>
                        <div className="text-sm text-blue-600 font-medium">
                            Expected launch: Q1 2025
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="text-gray-600">
                                <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Quick Actions</h3>
                        </div>
                        <div className="space-y-3">
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 group"
                            >
                                <span className="text-gray-700 group-hover:text-blue-600">Back to Dashboard</span>
                                <svg className="h-4 w-4 text-gray-400 group-hover:text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </Link>
                            <button className="w-full flex items-center justify-between p-3 bg-white rounded-md border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-all duration-200 group">
                                <span className="text-gray-700 group-hover:text-green-600">Get Notified</span>
                                <svg className="h-4 w-4 text-gray-400 group-hover:text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7V3a1 1 0 011-1h5l2 2h7a1 1 0 011 1v4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}