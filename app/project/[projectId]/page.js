import Link from 'next/link';

// Mock data for projects (in a real app, this would come from a database)
const projects = {
    '1': { title: 'How to Bake Sourdough Bread' },
    '2': { title: 'Ultimate Guide to Home Workouts' },
    '3': { title: 'Digital Marketing for Beginners' },
    '4': { title: 'Photography Tips for Content Creators' }
};

export default function ProjectPage({ params }) {
    const { projectId } = params;
    const project = projects[projectId];

    // If project doesn't exist, show not found
    if (!project) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
                    <p className="text-gray-600 mb-6">The project you're looking for doesn't exist.</p>
                    <Link
                        href="/dashboard"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors duration-200"
                    >
                        Back to Dashboard
                    </Link>
                </div>
            </div>
        );
    }

    const features = [
        {
            title: 'Keyword Research',
            description: 'Discover high-performing keywords for your video content',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
            )
        },
        {
            title: 'Competitor Analysis',
            description: 'Analyze your competitors and identify content opportunities',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            )
        },
        {
            title: 'Metadata Generator',
            description: 'Generate optimized titles, descriptions, and tags',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
            )
        },
        {
            title: 'Rank Tracker',
            description: 'Monitor your video performance and rankings',
            icon: (
                <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            )
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                        <Link href="/dashboard" className="hover:text-blue-600 transition-colors duration-200">
                            Dashboard
                        </Link>
                        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                        <span className="text-gray-900">{project.title}</span>
                    </div>

                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Project: {project.title}
                    </h1>
                    <p className="text-gray-600">
                        Access all CreatorML tools for this video project
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group"
                        >
                            <div className="flex items-start gap-4">
                                <div className="text-blue-600 group-hover:text-blue-700 transition-colors duration-200">
                                    {feature.icon}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
                                        {feature.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {feature.description}
                                    </p>
                                    <div className="flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                        <span className="text-sm font-medium">Launch tool</span>
                                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Coming Soon Notice */}
                <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex items-center gap-3">
                        <div className="text-blue-600">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium text-blue-900 mb-1">Tools Coming Soon</h3>
                            <p className="text-blue-700">
                                We're currently building these powerful tools to help you create better video content. Stay tuned!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
