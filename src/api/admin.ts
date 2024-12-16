import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import type { PendingQuestion } from '../types/question';
import type { User } from '../types/user';

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true
});

export const getPendingQuestions = () => 
  api.get<PendingQuestion[]>('/api/getPendingQuestions');

export const approveQuestion = (questionId: string) =>
  api.get(`/api/approveQuestion?id=${questionId}`);

export const rejectQuestion = (questionId: string) =>
  api.get(`/api/rejectQuestion?id=${questionId}`);

export const getUsers = () =>
  api.get<User[]>('/api/getUsers');

export const getUserById = (id: string) =>
  api.get<User>(`/api/getUserDetails?id=${id}`);