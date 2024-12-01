import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { 
  getCategories, 
  getSources, 
  getTopics, 
  submitQuestion, 
  checkLoginStatus 
} from '../utils/api';
import { Category, Topic, Source } from '../types/question';

export default function QuestionForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    topic: '',
    source: '',
    category: '',
    correctAnswer: ''
  });

  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newTopic, setNewTopic] = useState('');
  const [newSource, setNewSource] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [showNewTopic, setShowNewTopic] = useState(false);
  const [showNewSource, setShowNewSource] = useState(false);
  const [showNewCategory, setShowNewCategory] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: isLoggedIn } = await checkLoginStatus();
        
        if (!isLoggedIn) {
          navigate('/login');
          return;
        }

        const [categoriesRes, sourcesRes, topicsRes] = await Promise.all([
          getCategories(),
          getSources(),
          getTopics()
        ]);

        setCategories(categoriesRes.data);
        setSources(sourcesRes.data);
        setTopics(topicsRes.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await submitQuestion(formData);
      setFormData({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        topic: '',
        source: '',
        category: '',
        correctAnswer: ''
      });
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Submit a Question</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
        {/* Question Text */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Question
          </label>
          <textarea
            name="question"
            value={formData.question}
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
                value={formData[`option${option}` as keyof typeof formData]}
                onChange={handleInputChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                required
              />
            </div>
          ))}
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          <div className="flex gap-2">
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Category</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewCategory(true)}
              className="p-2 text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Topic */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Topic
          </label>
          <div className="flex gap-2">
            <select
              name="topic"
              value={formData.topic}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Topic</option>
              {topics.map((topic) => (
                <option key={topic.id} value={topic.id}>
                  {topic.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewTopic(true)}
              className="p-2 text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

        {/* Source */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Source
          </label>
          <div className="flex gap-2">
            <select
              name="source"
              value={formData.source}
              onChange={handleInputChange}
              className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              required
            >
              <option value="">Select Source</option>
              {sources.map((source) => (
                <option key={source.id} value={source.id}>
                  {source.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={() => setShowNewSource(true)}
              className="p-2 text-indigo-600 hover:text-indigo-700"
            >
              <Plus size={24} />
            </button>
          </div>
        </div>

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
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit Question
        </button>
      </form>
    </div>
  );
}