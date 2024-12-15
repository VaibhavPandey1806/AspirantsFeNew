import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../components/HomePage';
import QuestionForm from '../components/QuestionForm';
import QuestionBank from '../pages/QuestionBank';
import QuestionList from '../pages/QuestionList';
import QuestionDetail from '../pages/QuestionDetail';
import AuthPage from '../components/AuthPage';
import RegisterPage from '../components/RegisterPage';
import Profile from '../pages/Profile';
import UserResponses from '../pages/UserResponses';
import AboutUs from '../components/AboutUs';
import PrivateRoute from './PrivateRoute';

interface AppRoutesProps {
  isLoggedIn: boolean;
}

export default function AppRoutes({ isLoggedIn }: AppRoutesProps) {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/submit-question" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <QuestionForm />
        </PrivateRoute>
      } />
      <Route path="/question-bank" element={<QuestionBank />} />
      <Route path="/questions" element={<QuestionList />} />
      <Route path="/questions/:id" element={<QuestionDetail />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/profile" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <Profile />
        </PrivateRoute>
      } />
      <Route path="/responses" element={
        <PrivateRoute isLoggedIn={isLoggedIn}>
          <UserResponses />
        </PrivateRoute>
      } />
    </Routes>
  );
}