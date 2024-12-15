import React from 'react';
import { useNavigate } from 'react-router-dom';
import { submitQuestion, checkLoginStatus } from '../utils/api';
import SelectWithAdd from './Select/SelectWithAdd';
import { useQuestionForm } from '../hooks/useQuestionForm';
import type { QuestionSubmission } from '../types/api';

export default function QuestionForm() {
  const navigate = useNavigate();
  const {
    formData,
    categories,
    topics,
    sources,
    selectedCategory,
    selectedTopic,
    selectedSource,
    newCategory,
    newTopic,
    newSource,
    isSubmitting,
    error,
    handleInputChange,
    handleCategorySelect,
    handleTopicSelect,
    handleSourceSelect,
    handleAddNewCategory,
    handleAddNewTopic,
    handleAddNewSource,
    setIsSubmitting,
    setError,
    resetForm
  } = useQuestionForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Validate that either a selection or new item is provided
    if (!selectedCategory?.id && !newCategory) {
      setError('Please select or add a category');
      return;
    }
    if (!selectedTopic?.id && !newTopic) {
      setError('Please select or add a topic');
      return;
    }
    if (!selectedSource?.id && !newSource) {
      setError('Please select or add a source');
      return;
    }

    try {
      setIsSubmitting(true);
      setError(null);

      const { data: isLoggedIn } = await checkLoginStatus();
      if (!isLoggedIn) {
        navigate('/login');
        return;
      }

      const submissionData: QuestionSubmission = {
        ...formData,
        section: selectedCategory?.name || newCategory,
        sectionId: selectedCategory?.id,
        topic: selectedTopic?.name || newTopic,
        topicId: selectedTopic?.id,
        source: selectedSource?.name || newSource,
        sourceId: selectedSource?.id
      };

      await submitQuestion(submissionData);
      resetForm();
      alert('Question submitted successfully!');
    } catch (error) {
      console.error('Error submitting question:', error);
      setError('Failed to submit question. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Question</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            name="questionText"
            value={formData.questionText}
            onChange={handleInputChange}
            rows={4}
            className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {['A', 'B', 'C', 'D'].map((option) => (
            <div key={option}>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Option {option}
              </label>
              <input
                type="text"
                name={`option${option}`}
                value={formData[`option${option}` as keyof typeof formData] || ''}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Category */}
        <SelectWithAdd
          label="Category"
          value={selectedCategory?.id || ''}
          options={categories}
          onChange={handleCategorySelect}
          onAddNew={handleAddNewCategory}
          placeholder="Select or add new category"
          required
          selectedName={newCategory}
        />

        {/* Topic */}
        <SelectWithAdd
          label="Topic"
          value={selectedTopic?.id || ''}
          options={topics}
          onChange={handleTopicSelect}
          onAddNew={handleAddNewTopic}
          placeholder="Select or add new topic"
          required
          selectedName={newTopic}
        />

        {/* Source */}
        <SelectWithAdd
          label="Source"
          value={selectedSource?.id || ''}
          options={sources}
          onChange={handleSourceSelect}
          onAddNew={handleAddNewSource}
          placeholder="Select or add new source"
          required
          selectedName={newSource}
        />

        {/* Correct Answer */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct Answer
          </label>
          <div className="flex gap-4">
            {['A', 'B', 'C', 'D'].map((option) => (
              <label key={option} className="flex items-center">
                <input
                  type="radio"
                  name="correctAnswer"
                  value={option}
                  checked={formData.correctAnswer === option}
                  onChange={handleInputChange}
                  className="mr-2"
                  required
                />
                <span>{option}</span>
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? 'Submitting...' : 'Submit Question'}
        </button>
      </form>
    </div>
  );
}