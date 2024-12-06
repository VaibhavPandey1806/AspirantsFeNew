import axios from 'axios';
import { Question, Category, Topic, Source } from '../types/question';
import { User } from '../types/user';
import { Comment } from '../types/comment';
import { UserResponses } from '../types/response';
import { API_BASE_URL, API_TIMEOUT } from '../config/api';

const api = axios.create({
  // In development, we'll use the proxy configured in Vite
  // In production, we'll use the full URL
  baseURL:  'https://aspirantsclub-production.up.railway.app',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Add response interceptor for error handling
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      window.location.href = '/login';
    }
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);


// Auth
export const checkLoginStatus = () => api.get('/public/isLogin');
export const getUserDetails = () => api.get('/api/userDetails');
export const getUserById = (id: string) => api.get<User>(`/api/getUserDetails?id=${id}`);
export const registerUser = (userData: {
  username: string;
  password: string;
  name: string;
  mobile: string;
  emailId: string;
}) => api.post('/public/addUser', userData);

// Categories
export const getCategories = () => api.get<Category[]>('/api/categories');
export const getCategoryDetail = (categoryId: string) => 
  api.get<Category>(`/api/categoryDetail?categoryId=${categoryId}`);

// Topics
export const getTopics = () => api.get<Topic[]>('/api/topics');
export const getTopicsByCategory = (categoryId: string) =>
  api.get<Topic[]>(`/api/getTopicsByCategory?categoryId=${categoryId}`);

// Sources
export const getSources = () => api.get<Source[]>('/api/sources');

// Questions
export const getQuestionsByFilters = (params: {
  category: string[];
  topic?: string[];
  source?: string[];
}) => {
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
  
  return api.get<Question[]>(`/api/getQuestionsByFilters?${queryParams.toString()}`);
};

export const getQuestionById = (id: string) => 
  api.get<Question>(`/api/getQuestionsbyId?id=${id}`);

export const submitQuestion = (questionData: {
  question: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  topic: string;
  source: string;
  category: string;
  correctAnswer: string;
}) => api.post<Question>('/api/questions', questionData);

// Responses
export const submitResponse = (params: {
  userId: string;
  timer: number;
  questionId: string;
  response: boolean;
}) => api.get<string>('/api/addResponse', { params });

export const getUserResponses = () => api.get<UserResponses>('/api/getResponses');

// Comments
export const addComment = (questionId: string, text: string) =>
  api.post<Comment>('/api/addComment', null, { params: { questionId, text } });

export const getCommentById = (id: string) =>
  api.get<Comment>(`/api/getCommentsbyId?id=${id}`);

export const addReply = (commentId: string, text: string) =>
  api.post<Comment>('/api/addReply', null, { params: { commentId, text } });

export const likeComment = (id: string) =>
  api.post<Comment>('/api/likeComment', null, { params: { id } });

export const unlikeComment = (id: string) =>
  api.post<Comment>('/api/unlikeComment', null, { params: { id } });

export const dislikeComment = (id: string) =>
  api.post<Comment>('/api/dislikeComment', null, { params: { id } });

export const hasLiked = (id: string) =>
  api.get<boolean>('/api/hasLiked', { params: { id } });

// AI Opinion
export const getAIOpinion = (id: string) =>
  api.get<string>(`/api/AiResponseQuestionsbyId?id=${id}`);