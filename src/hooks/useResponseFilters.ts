import { useState, useEffect } from 'react';
import { getCategories, getTopicsByCategory, getSources } from '../utils/api';
import { Category, Topic, Source } from '../types/question';
import { UserResponse } from '../types/response';

export function useResponseFilters(responses: UserResponse[]) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedSource, setSelectedSource] = useState<string>('');

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [categoriesRes, sourcesRes] = await Promise.all([
          getCategories(),
          getSources()
        ]);
        setCategories(categoriesRes.data);
        setSources(sourcesRes.data);
      } catch (error) {
        console.error('Error fetching filters:', error);
      }
    };

    fetchFilters();
  }, []);

  useEffect(() => {
    const fetchTopics = async () => {
      if (!selectedCategory) {
        setTopics([]);
        return;
      }

      try {
        const { data } = await getTopicsByCategory(selectedCategory);
        setTopics(data);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      }
    };

    fetchTopics();
  }, [selectedCategory]);

  const filteredResponses = responses.filter(response => {
    const matchesCategory = !selectedCategory || response.question.section === selectedCategory;
    const matchesTopic = !selectedTopic || response.question.topic === selectedTopic;
    const matchesSource = !selectedSource || response.question.source === selectedSource;
    return matchesCategory && matchesTopic && matchesSource;
  });

  return {
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
  };
}