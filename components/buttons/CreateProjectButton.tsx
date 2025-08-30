'use client';

import { useState } from 'react';
import CreateProjectModal from '../modals/CreateProjectModal';
import { ProjectType } from '@/types';

export default function CreateProjectButton({ onCreateProject, userId, onRefresh }: {
    onCreateProject: (project: ProjectType) => void;
    userId: string;
    onRefresh: () => Promise<void>;
}) {
    const [isModalOpen, setIsModalOpen] = useState(false);

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
            {isModalOpen &&
                <CreateProjectModal
                    onCreateProject={onCreateProject}
                    userId={userId}
                    onRefresh={onRefresh}
                    setIsModalOpen={setIsModalOpen}
                />
            }
        </>
    );
}