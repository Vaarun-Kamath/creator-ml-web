// API service for keyword operations
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080';

/**
 * Search for keyword suggestions based on a seed keyword
 * @param {string} seedKeyword - The seed keyword to search for
 * @returns {Promise<Array>} Array of keyword suggestions with metrics
 */
export const searchKeywords = async (seedKeyword: string) => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/keywords/research?seed=${encodeURIComponent(seedKeyword)}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Failed to search keywords');
        }

        return data.suggestions || [];
    } catch (error) {
        console.error('Error searching keywords:', error);
        throw error;
    }
};
