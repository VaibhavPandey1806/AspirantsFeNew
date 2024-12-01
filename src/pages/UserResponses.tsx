import React, { useEffect, useState } from 'react';
import { getUserResponses } from '../utils/api';
import type { UserResponses as UserResponsesType } from '../types/response';
import { CheckCircle, XCircle, Clock, Filter } from 'lucide-react';
import { useResponseFilters } from '../hooks/useResponseFilters';
import FilterSelect from '../components/Filters/FilterSelect';

export default function UserResponsesPage() {
  const [responses, setResponses] = useState<UserResponsesType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const { data } = await getUserResponses();
        setResponses(data);
      } catch (error) {
        console.error('Error fetching responses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResponses();
  }, []);

  const {
    categories,
    topics,
    sources,
    selectedCategory,
    selectedTopic,
    selectedSource,
    setSelectedCategory,
    setSelectedTopic,
    setSelectedSource,
    filteredResponses
  } = useResponseFilters(responses?.responses || []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!responses) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">No responses found.</p>
      </div>
    );
  }

  const totalQuestions = filteredResponses.length;
  const correctAnswers = filteredResponses.filter(r => r.response).length;
  const averageTime = totalQuestions > 0 
    ? filteredResponses.reduce((acc, r) => acc + r.time, 0) / totalQuestions 
    : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Responses</h1>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
        >
          <Filter size={20} />
          <span>{showFilters ? 'Hide Filters' : 'Show Filters'}</span>
        </button>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterSelect
              label="Category"
              value={selectedCategory}
              onChange={(value) => {
                setSelectedCategory(value);
                setSelectedTopic('');
              }}
              options={categories}
            />
            <FilterSelect
              label="Topic"
              value={selectedTopic}
              onChange={setSelectedTopic}
              options={topics}
              disabled={!selectedCategory}
              placeholder={selectedCategory ? 'All Topics' : 'Select a Category first'}
            />
            <FilterSelect
              label="Source"
              value={selectedSource}
              onChange={setSelectedSource}
              options={sources}
            />
          </div>
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Questions</p>
              <p className="text-2xl font-bold text-gray-900">{totalQuestions}</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Correct Answers</p>
              <p className="text-2xl font-bold text-gray-900">
                {correctAnswers} ({totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0}%)
              </p>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Average Time</p>
              <p className="text-2xl font-bold text-gray-900">{formatTime(Math.round(averageTime))}</p>
            </div>
            <div className="p-3 bg-purple-50 rounded-full">
              <Clock className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Response List */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Question
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Topic
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time Taken
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredResponses.map((response, index) => (
                <tr key={response.id || index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-normal">
                    <div className="text-sm text-gray-900 max-w-xl">
                      {response.question.questionText}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{response.question.section}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{response.question.topic}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{formatTime(response.time)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {response.response ? (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Correct
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        <XCircle className="w-4 h-4 mr-1" />
                        Incorrect
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}