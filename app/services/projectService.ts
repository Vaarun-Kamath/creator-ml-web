// API service for project operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Create a new project
 * @param {string} title - The project title
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} The created project data
 */
export const createProject = async (title: string, userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-user-id': userId,
            },
            body: JSON.stringify({ title }),
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to create project');
        }

        return data.data.project;
    } catch (error) {
        console.error('Error creating project:', error);
        throw error;
    }
};

/**
 * Get all projects for a user
 * @param {string} userId - The user ID
 * @returns {Promise<Array>} Array of user projects
 */
export const getProjects = async (userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects`, {
            method: 'GET',
            headers: {
                'x-user-id': userId,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch projects');
        }

        return data.data.projects;
    } catch (error) {
        console.error('Error fetching projects:', error);
        throw error;
    }
};

/**
 * Get a single project by ID
 * @param {string} projectId - The project ID
 * @param {string} userId - The user ID
 * @returns {Promise<Object>} The project data
 */
export const getProjectById = async (projectId: string, userId: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'x-user-id': userId,
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to fetch project');
        }

        return data.data.project;
    } catch (error) {
        console.error('Error fetching project:', error);
        throw error;
    }
};
