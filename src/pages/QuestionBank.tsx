import React from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import MultiSelectFilter from '../components/QuestionBank/MultiSelectFilter';
import { useQuestionBank } from '../hooks/useQuestionBank';

export default function QuestionBank() {
  const navigate = useNavigate();
  const {
    categories,
    topics,
    sources,
    selectedCategories,
    selectedTopics,
    selectedSources,
    setSelectedCategories,
    setSelectedTopics,
    setSelectedSources,
  } = useQuestionBank();

  const handleCategorySelect = (id: string) => {
    setSelectedCategories(prev => [...prev, id]);
    setSelectedTopics([]);
  };

  const handleCategoryRemove = (id: string) => {
    setSelectedCategories(prev => prev.filter(categoryId => categoryId !== id));
    setSelectedTopics([]);
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedCategories.length) {
      params.append('category', selectedCategories.join(','));
    }
    if (selectedTopics.length) {
      params.append('topic', selectedTopics.join(','));
    }
    if (selectedSources.length) {
      params.append('source', selectedSources.join(','));
    }
    navigate(`/questions?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Question Bank</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <MultiSelectFilter
          title="Categories"
          options={categories}
          selectedIds={selectedCategories}
          onSelect={handleCategorySelect}
          onRemove={handleCategoryRemove}
        />
        
        <MultiSelectFilter
          title="Topics"
          options={topics}
          selectedIds={selectedTopics}
          onSelect={(id) => setSelectedTopics(prev => [...prev, id])}
          onRemove={(id) => setSelectedTopics(prev => prev.filter(topicId => topicId !== id))}
          isDisabled={selectedCategories.length === 0}
        />
        
        <MultiSelectFilter
          title="Sources"
          options={sources}
          selectedIds={selectedSources}
          onSelect={(id) => setSelectedSources(prev => [...prev, id])}
          onRemove={(id) => setSelectedSources(prev => prev.filter(sourceId => sourceId !== id))}
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={handleSearch}
          disabled={selectedCategories.length === 0}
          className={`flex items-center space-x-2 px-6 py-3 rounded-lg text-white ${
            selectedCategories.length > 0
              ? 'bg-indigo-600 hover:bg-indigo-700'
              : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          <Search size={20} />
          <span>Search Questions</span>
        </button>
      </div>
    </div>
  );
}