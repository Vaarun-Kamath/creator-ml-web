'use client';

import React, { useState } from 'react';
import { searchKeywords } from '../app/services/keywordService';
import { addKeywordToProject } from '../app/services/projectService';

interface SavedKeyword {
    _id: string;
    keyword: string;
    competition: number;
    demand: number;
    addedAt: string;
}

interface SearchResult {
    keyword: string;
    competition: number;
    demand: number;
}

interface KeywordResearchProps {
    projectId: string;
    initialSavedKeywords: SavedKeyword[];
}

export default function KeywordResearch({ projectId, initialSavedKeywords }: KeywordResearchProps) {
    const [seedKeyword, setSeedKeyword] = useState('');
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
    const [savedKeywords, setSavedKeywords] = useState<SavedKeyword[]>(initialSavedKeywords);
    const [isSearching, setIsSearching] = useState(false);
    const [savingKeywords, setSavingKeywords] = useState<Set<string>>(new Set());
    const [searchError, setSearchError] = useState<string | null>(null);

    // Mock userId - in a real app, this would come from authentication
    const userId = 'User1';

    const handleSearch = async () => {
        if (!seedKeyword.trim()) return;

        setIsSearching(true);
        setSearchError(null);

        try {
            const results = await searchKeywords(seedKeyword.trim());
            setSearchResults(results);
        } catch (error: any) {
            console.error('Error searching keywords:', error);
            setSearchError(error.message || 'Failed to search keywords');
            setSearchResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleSaveKeyword = async (keyword: SearchResult) => {
        // Check if keyword is already saved
        const isAlreadySaved = savedKeywords.some(
            (saved) => saved.keyword.toLowerCase() === keyword.keyword.toLowerCase()
        );

        if (isAlreadySaved) {
            alert('This keyword is already saved to your project!');
            return;
        }

        // Add to saving state
        setSavingKeywords(prev => new Set(prev).add(keyword.keyword));

        try {
            const response = await addKeywordToProject(projectId, userId, {
                keyword: keyword.keyword,
                competition: keyword.competition,
                demand: keyword.demand
            });

            // Optimistically update the saved keywords
            const newSavedKeyword: SavedKeyword = {
                _id: response.addedKeyword._id,
                keyword: keyword.keyword,
                competition: keyword.competition,
                demand: keyword.demand,
                addedAt: response.addedKeyword.addedAt
            };

            setSavedKeywords(prev => [...prev, newSavedKeyword]);

            // Remove from search results
            setSearchResults(prev => prev.filter(result => result.keyword !== keyword.keyword));

        } catch (error: any) {
            console.error('Error saving keyword:', error);
            alert(error.message || 'Failed to save keyword');
        } finally {
            // Remove from saving state
            setSavingKeywords(prev => {
                const newSet = new Set(prev);
                newSet.delete(keyword.keyword);
                return newSet;
            });
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !isSearching) {
            handleSearch();
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getCompetitionColor = (score: number) => {
        if (score >= 80) return 'text-red-600 bg-red-50';
        if (score >= 60) return 'text-orange-600 bg-orange-50';
        if (score >= 40) return 'text-yellow-600 bg-yellow-50';
        return 'text-green-600 bg-green-50';
    };

    const getDemandColor = (score: number) => {
        if (score >= 1000) return 'text-green-600 bg-green-50';
        if (score >= 500) return 'text-blue-600 bg-blue-50';
        if (score >= 100) return 'text-yellow-600 bg-yellow-50';
        return 'text-gray-600 bg-gray-50';
    };

    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="text-blue-600">
                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-900">Keyword Research</h2>
                    <p className="text-gray-600">Discover and save high-performing keywords for your content</p>
                </div>
            </div>

            {/* Search Section */}
            <div className="mb-8">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Search Keywords</h3>
                <div className="flex gap-3">
                    <div className="flex-1">
                        <input
                            type="text"
                            value={seedKeyword}
                            onChange={(e) => setSeedKeyword(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Enter a seed keyword (e.g., 'how to bake bread')"
                            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            disabled={isSearching}
                        />
                    </div>
                    <button
                        onClick={handleSearch}
                        disabled={isSearching || !seedKeyword.trim()}
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed text-white rounded-md transition-colors font-medium flex items-center space-x-2"
                    >
                        {isSearching && (
                            <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                        )}
                        <span>{isSearching ? 'Searching...' : 'Search'}</span>
                    </button>
                </div>

                {searchError && (
                    <div className="mt-3 text-red-600 text-sm bg-red-50 p-3 rounded-md border border-red-200">
                        {searchError}
                    </div>
                )}
            </div>

            {/* Search Results Section */}
            {searchResults.length > 0 && (
                <div className="mb-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                        Search Results ({searchResults.length} keywords found)
                    </h3>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Keyword
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Demand
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Competition
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {searchResults.map((result, index) => (
                                    <tr key={index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {result.keyword}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDemandColor(result.demand)}`}>
                                                {result.demand.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(result.competition)}`}>
                                                {result.competition}/100
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button
                                                onClick={() => handleSaveKeyword(result)}
                                                disabled={savingKeywords.has(result.keyword)}
                                                className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md transition-colors text-sm flex items-center space-x-1"
                                            >
                                                {savingKeywords.has(result.keyword) && (
                                                    <svg className="animate-spin h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                    </svg>
                                                )}
                                                <span>{savingKeywords.has(result.keyword) ? 'Saving...' : 'Save'}</span>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Saved Keywords Section */}
            <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Saved Keywords ({savedKeywords.length})
                </h3>
                {savedKeywords.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                        <svg className="h-12 w-12 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        <p className="text-lg font-medium mb-2">No keywords saved yet</p>
                        <p className="text-sm">Search for keywords above and save them to your project</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Keyword
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Demand
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Competition
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date Added
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {savedKeywords.map((keyword) => (
                                    <tr key={keyword._id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {keyword.keyword}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDemandColor(keyword.demand)}`}>
                                                {keyword.demand.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getCompetitionColor(keyword.competition)}`}>
                                                {keyword.competition}/100
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {formatDate(keyword.addedAt)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}
