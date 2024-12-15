// Auth URLs

const LOGIN_URL='https://aspirantsclub-production.up.railway.app/login'
const LOGOUT_URL='https://aspirantsclub-production.up.railway.app/logout'

// export const LOGIN_URL = 'http://localhost:8086/login';
// export const LOGOUT_URL = 'http://localhost:8086/logout';

// API Base URL
export const API_BASE_URL = 'https://aspirantsclub-production.up.railway.app';

// export const API_BASE_URL = 'http://localhost:8086';


// Routes
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  QUESTION_BANK: '/question-bank',
  SUBMIT_QUESTION: '/submit-question',
  PROFILE: '/profile'
} as const;