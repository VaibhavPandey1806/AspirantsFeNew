import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { QuestionSubmission, QuestionFilters } from '../types/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getQuestionById = (id: string) => api.get(`/api/getQuestionsbyId?id=${id}`);
export interface QuestionSubmission {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  correctAnswer: string;
  section?: string;
  sectionId?: string;
  topic?: string;
  topicId?: string;
  source?: string;
  sourceId?: string;
}

export const submitQuestion = (data: QuestionSubmission) => {
  const params = new URLSearchParams();
  
  // Add all parameters to query string
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined) {
      params.append(key, value.toString());
    }
  });
  
  return api.get(`/api/addQuestion?${params.toString()}`);
};

export const getQuestionsByFilters = (params: QuestionFilters) => {
  const queryParams = new URLSearchParams();
  
  if (params.category) {
    queryParams.append('category', params.category.join(','));
  }
  if (params.topic) {
    queryParams.append('topic', params.topic.join(','));
  }
  if (params.source) {
    queryParams.append('source', params.source.join(','));
  }
  
  return api.get(`/api/getQuestionsByFilters?${queryParams.toString()}`);
};
// Add to existing file
export const getSubmittedQuestions = () => 
  api.get<QuestionPending[]>('/api/getSubmittedQuestions');