import { useState, useEffect } from 'react';
import { 
  getCategories, 
  getSources, 
  getTopicsByCategory
} from '../utils/api';
import { Category, Topic, Source } from '../types/question';

export function useQuestionBank() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [topics, setTopics] = useState<Topic[]>([]);
  const [sources, setSources] = useState<Source[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  // Fetch initial data (categories and sources)
  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        const [categoriesRes, sourcesRes] = await Promise.all([
          getCategories(),
          getSources()
        ]);
        
        setCategories(categoriesRes.data);
        setSources(sourcesRes.data);
      } catch (error) {
        console.error('Error fetching initial data:', error);
        setCategories([]);
        setSources([]);
      }
    };

    fetchInitialData();
  }, []);

  // Fetch topics when categories change
  useEffect(() => {
    const fetchTopics = async () => {
      if (selectedCategories.length === 0) {
        setTopics([]);
        return;
      }

      try {
        const topicsPromises = selectedCategories.map(categoryId => 
          getTopicsByCategory(categoryId)
        );
        const responses = await Promise.all(topicsPromises);
        const allTopics = responses.flatMap(response => response.data);
        setTopics(allTopics);
      } catch (error) {
        console.error('Error fetching topics:', error);
        setTopics([]);
      }
    };

    fetchTopics();
  }, [selectedCategories]);

  return {
    categories,
    topics,
    sources,
    selectedCategories,
    selectedTopics,
    selectedSources,
    setSelectedCategories,
    setSelectedTopics,
    setSelectedSources
  };
}