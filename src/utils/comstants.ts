// Environment-specific configuration
const ENV = import.meta.env.MODE;

// Base URLs
export const API_BASE_URL =  'https://aspirantsclub-production.up.railway.app';

// Auth URLs
export const LOGIN_URL = `${API_BASE_URL}/login`;
export const LOGOUT_URL = `${API_BASE_URL}/logout`;

// API Endpoints
export const API_ENDPOINTS = {
  LOGIN_STATUS: '/public/isLogin',
  USER_DETAILS: '/api/userDetails',
  CATEGORIES: '/api/categories',
  TOPICS: '/api/topics',
  SOURCES: '/api/sources',
  QUESTIONS: '/api/questions',
  COMMENTS: '/api/comments'
} as const;

// Time constants (in milliseconds)
export const TIME_CONSTANTS = {
  API_TIMEOUT: 30000,
  SESSION_TIMEOUT: 3600000, // 1 hour
  DEBOUNCE_DELAY: 300
} as const;

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  MAX_PAGE_SIZE: 50
} as const;