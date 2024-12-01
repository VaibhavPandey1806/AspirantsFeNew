import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Question } from '../types/question';
import { User } from '../types/user';
import { getQuestionById, getUserById, getUserDetails, submitResponse } from '../utils/api';
import QuestionHeader from '../components/Question/QuestionHeader';
import QuestionOptions from '../components/Question/QuestionOptions';
import QuestionMeta from '../components/Question/QuestionMeta';
import CommentSection from '../components/Comments/CommentSection';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [submitter, setSubmitter] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string>('');
  const [showResult, setShowResult] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const [questionRes, userRes] = await Promise.all([
          getQuestionById(id),
          getUserDetails()
        ]);

        setQuestion(questionRes.data);
        setCurrentUser(userRes.data);

        if (questionRes.data.submittedBy) {
          const submitterRes = await getUserById(questionRes.data.submittedBy);
          setSubmitter(submitterRes.data);
        }

        setError(null);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to load question. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleTimerStart = () => {
    setIsTimerActive(true);
    setShowOptions(true);
  };

  const handleTimerPause = () => {
    setIsTimerActive(false);
  };

  const handleTimerTick = useCallback((seconds: number) => {
    setElapsedTime(seconds);
  }, []);

  const handleAnswerSubmit = async () => {
    if (!selectedAnswer || !question || !currentUser) return;

    try {
      const isCorrect = selectedAnswer === question.correctAnswer;
      
      await submitResponse({
        userId: currentUser.id,
        timer: elapsedTime,
        questionId: question.id,
        response: isCorrect
      });

      setShowResult(true);
      setIsTimerActive(false);
    } catch (error) {
      console.error('Error submitting response:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (error || !question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error || 'Question not found.'}</p>
        </div>
      </div>
    );
  }

  const options = {
    'A': question.optionA,
    'B': question.optionB,
    'C': question.optionC,
    'D': question.optionD
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <QuestionHeader
        onTimerStart={handleTimerStart}
        onTimerPause={handleTimerPause}
        onTimerTick={handleTimerTick}
        isTimerActive={isTimerActive}
      />

      <div className="space-y-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-xl font-medium text-gray-900 mb-8">{question.questionText}</h1>

          {!showOptions ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 mb-4">
                Click the play button to start the timer and reveal the options.
              </p>
            </div>
          ) : (
            <>
              <QuestionOptions
                options={options}
                selectedAnswer={selectedAnswer}
                correctAnswer={question.correctAnswer}
                showResult={showResult}
                isTimerActive={isTimerActive}
                onSelectAnswer={setSelectedAnswer}
              />

              {!showResult && (
                <button
                  onClick={handleAnswerSubmit}
                  disabled={!selectedAnswer || !isTimerActive}
                  className={`mt-8 w-full py-3 px-4 rounded-lg text-white font-medium
                    ${selectedAnswer && isTimerActive ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}
                  `}
                >
                  Submit Answer
                </button>
              )}
            </>
          )}

          <QuestionMeta
            topic={question.topic}
            source={question.source}
            submittedBy={submitter || undefined}
            dateSubmitted={question.dateTimeSubmitted}
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <CommentSection commentIds={question.comments} />
        </div>
      </div>
    </div>
  );
}