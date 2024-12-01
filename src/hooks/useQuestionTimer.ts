import { useState, useEffect, useCallback } from 'react';
import { submitResponse } from '../utils/api';

export function useQuestionTimer(questionId: string, userId?: string) {
  const [time, setTime] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    return () => {
      setIsActive(false);
      setTime(0);
      setSelectedAnswer('');
      setShowResult(false);
    };
  }, [questionId]);

  const startTimer = useCallback(() => {
    setIsActive(true);
    setShowResult(false);
    setSelectedAnswer('');
  }, []);

  const pauseTimer = useCallback(() => {
    setIsActive(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTime(0);
    setIsActive(false);
    setSelectedAnswer('');
    setShowResult(false);
  }, []);

  const submitAnswer = useCallback(async (isCorrect: boolean) => {
    if (!userId || !questionId || isSubmitting) return;

    try {
      setIsSubmitting(true);
      await submitResponse({
        userId,
        questionId,
        timer: time,
        response: isCorrect
      });
      setShowResult(true);
      pauseTimer();
    } catch (error) {
      console.error('Error submitting response:', error);
    } finally {
      setIsSubmitting(false);
    }
  }, [userId, questionId, time, isSubmitting, pauseTimer]);

  const handleAnswerSelect = useCallback((answer: string, correctAnswer: string) => {
    if (showResult || !isActive) return;
    
    setSelectedAnswer(answer);
    submitAnswer(answer === correctAnswer);
  }, [showResult, isActive, submitAnswer]);

  return {
    time,
    isActive,
    selectedAnswer,
    showResult,
    isSubmitting,
    startTimer,
    pauseTimer,
    resetTimer,
    handleAnswerSelect
  };
}