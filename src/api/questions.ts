import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { QuestionSubmission, QuestionFilters } from '../types/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getQuestionById = (id: string) => api.get(`/api/getQuestionsbyId?id=${id}`);
export const submitQuestion = (data: QuestionSubmission) => api.post('/api/questions', data);

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