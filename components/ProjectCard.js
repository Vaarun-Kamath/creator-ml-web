import Link from 'next/link';

export default function ProjectCard({ project }) {
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <Link href={`/project/${project.id}`}>
            <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg hover:border-blue-300 transition-all duration-200 cursor-pointer group">
                <div className="flex flex-col h-full">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors duration-200">
                        {project.title}
                    </h3>

                    <div className="mt-auto">
                        <p className="text-sm text-gray-500">
                            Last updated: {formatDate(project.lastUpdated)}
                        </p>
                    </div>

                    <div className="mt-3 flex items-center text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <span className="text-sm font-medium">View project</span>
                        <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </div>
                </div>
            </div>
        </Link>
    );
}
