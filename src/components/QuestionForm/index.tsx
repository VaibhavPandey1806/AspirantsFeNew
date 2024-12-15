import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionForm } from '../../hooks/useQuestionForm';
import QuestionFormHeader from './QuestionFormHeader';
import QuestionInput from './QuestionInput';
import OptionsInput from './OptionsInput';
import CategorySelect from './CategorySelect';
import CorrectAnswerSelect from './CorrectAnswerSelect';
import FormError from '../common/FormError';
import SubmitButton from '../common/SubmitButton';

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
    handleSubmit,
    handleInputChange,
    handleCategorySelect,
    handleTopicSelect,
    handleSourceSelect,
    handleAddNewCategory,
    handleAddNewTopic,
    handleAddNewSource
  } = useQuestionForm(navigate);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <QuestionFormHeader />
      
      {error && <FormError message={error} />}
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        <QuestionInput
          value={formData.questionText}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <OptionsInput
          options={formData}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <CategorySelect
          categories={categories}
          topics={topics}
          sources={sources}
          selectedCategory={selectedCategory}
          selectedTopic={selectedTopic}
          selectedSource={selectedSource}
          newCategory={newCategory}
          newTopic={newTopic}
          newSource={newSource}
          onCategorySelect={handleCategorySelect}
          onTopicSelect={handleTopicSelect}
          onSourceSelect={handleSourceSelect}
          onAddCategory={handleAddNewCategory}
          onAddTopic={handleAddNewTopic}
          onAddSource={handleAddNewSource}
          disabled={isSubmitting}
        />
        
        <CorrectAnswerSelect
          value={formData.correctAnswer}
          onChange={handleInputChange}
          disabled={isSubmitting}
        />
        
        <SubmitButton
          isSubmitting={isSubmitting}
          text="Submit Question"
          loadingText="Submitting..."
        />
      </form>
    </div>
  );
}