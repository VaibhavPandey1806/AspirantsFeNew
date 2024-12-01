import axios from 'axios';
import { Question, Category, Topic, Source } from '../types/question';
import { User } from '../types/user';
import { Comment } from '../types/comment';
import { API_BASE_URL, API_TIMEOUT } from '../config/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  withCredentials: true,
});

// Auth
export const checkLoginStatus = () => api.get<boolean>('/public/isLogin');
export const getUserDetails = () => api.get<User>('/api/userDetails');
export const getUserById = (id: string) => api.get<User>(`/api/getUserDetails?id=${id}`);
export const registerUser = (userData: {
  name: string;
  username: string;
  password: string;
  mobile: string;
  email: string;
}) => api.get<User>('/api/addUserfromWeb', { params: userData });

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
  category?: string[];
  topic?: string[];
  source?: string[];
}) => {
  const queryParams = new URLSearchParams();

  // Handle array parameters
  if (params.category) {
    params.category.forEach(cat => queryParams.append('category', cat));
  }
  if (params.topic) {
    params.topic.forEach(topic => queryParams.append('topic', topic));
  }
  if (params.source) {
    params.source.forEach(source => queryParams.append('source', source));
  }

  return api.get<Question[]>(`/api/getQuestionsByFilters?${queryParams.toString()}`);
};

export const getQuestionById = (id: string) => 
  api.get<Question>(`/api/getQuestionsbyId?id=${id}`);

export const submitQuestion = (questionData: {
  questionText: string;
  optionA: string;
  optionB: string;
  optionC: string;
  optionD: string;
  topicId: string;
  sourceId: string;
  sectionId: string;
  correctAnswer: 'A' | 'B' | 'C' | 'D';
}) => api.post<Question>('/api/questions', questionData);

// Responses
export const submitResponse = (params: {
  userId: string;
  timer: number;
  questionId: string;
  response: boolean;
}) => api.get<string>('/api/addResponse', { params });

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