'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { getProjectById } from '../../services/projectService';
import { ProjectType } from '@/types';

interface ProjectPageProps {
    params: { projectId: string };
}

export default function ProjectPage({ params }: ProjectPageProps) {
    const { projectId } = params;
    const [project, setProject] = useState<ProjectType | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // For now, using a mock userId - in a real app, this would come from authentication
    const userId = 'User1';

    useEffect(() => {
        const fetchProject = async () => {
            try {
                setLoading(true);
                setError(null);
                const projectData = await getProjectById(projectId, userId);
                setProject(projectData);
            } catch (err: any) {
                console.error('Error fetching project:', err);
                setError(err.message || 'Failed to load project');
            } finally {
                setLoading(false);
            }
        };

        if (projectId && userId) {
            fetchProject();
        }
    }, [projectId, userId]);

    // Loading state
    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-64 mb-4"></div>
                        <div className="h-12 bg-gray-200 rounded w-96 mb-8"></div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[1, 2, 3, 4].map((i) => (
                                <div key={i} className="bg-white rounded-lg p-6 border">
                                    <div className="h-8 bg-gray-200 rounded w-32 mb-4"></div>
                                    <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                    <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error state
    if (error || !project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center max-w-md mx-auto px-4">
                    <div className="text-red-600 mb-4">
                        <svg className="h-16 w-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 18.5c-.77.833.192 2.5 1.732 2.5z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">
                        {error?.includes('not found') ? 'Project Not Found' : 'Error Loading Project'}
                    </h1>
                    <p className="text-gray-600 mb-6">
                        {error || 'The project you\'re looking for doesn\'t exist or you don\'t have access to it.'}
                    </p>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors duration-200 font-medium"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const features = [
        {
            title: 'Keyword Research',
            description: 'Discover high-performing keywords for your video content using AI-powered analysis',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        },
        {
            title: 'Competitor Analysis',
            description: 'Analyze your competitors and identify content gaps and opportunities',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        },
        {
            title: 'Metadata Generator',
            description: 'Generate optimized titles, descriptions, and tags using advanced AI algorithms',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        },
        {
            title: 'Rank Tracker',
            description: 'Monitor your video performance and search rankings across platforms',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        },
        {
            title: 'Content Audit',
            description: 'Comprehensive analysis of your video content for optimization opportunities',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        },
        {
            title: 'Performance Analytics',
            description: 'Track and analyze your video performance with detailed insights and metrics',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            status: 'coming_soon',
            href: '#'
        }
    ];

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

                {/* Features Grid */}
                <div className="mb-8">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Tools</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md hover:border-blue-300 transition-all duration-200 cursor-pointer group relative overflow-hidden"
                            >
                                {/* Coming Soon Badge */}
                                {feature.status === 'coming_soon' && (
                                    <div className="absolute top-4 right-4">
                                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                                            Coming Soon
                                        </span>
                                    </div>
                                )}

                                <div className="flex items-start gap-4">
                                    <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200 flex-shrink-0">
                                        {feature.icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                            {feature.title}
                                        </h3>
                                        <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                                            {feature.description}
                                        </p>
                                        <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <span className="text-sm font-medium">
                                                {feature.status === 'coming_soon' ? 'Notify me' : 'Launch tool'}
                                            </span>
                                            <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>

                                {/* Disabled overlay for coming soon items */}
                                {feature.status === 'coming_soon' && (
                                    <div className="absolute inset-0 bg-gray-50 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                                )}
                            </div>
                        ))}
                    </div>
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