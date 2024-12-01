import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getQuestionById } from '../utils/api';
import { Question } from '../types/question';
import { Comment } from '../types/comment';
import CommentSection from '../components/Comments/CommentSection';
import { useComments } from '../hooks/useComments';

export default function QuestionDetail() {
  const { id } = useParams<{ id: string }>();
  const [question, setQuestion] = useState<Question | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { fetchComments } = useComments(() => fetchQuestionAndComments());

  const fetchQuestionAndComments = async () => {
    if (!id) return;
    
    try {
      setIsLoading(true);
      const { data: questionData } = await getQuestionById(id);
      setQuestion(questionData);

      // Only fetch comments if the question has comments array and it's not empty
      if (questionData.comments && Array.isArray(questionData.comments) && questionData.comments.length > 0) {
        const fetchedComments = await fetchComments(questionData.comments);
        setComments(fetchedComments.filter(Boolean)); // Filter out any null/undefined comments
      } else {
        setComments([]); // Reset comments if there are none
      }
    } catch (error) {
      console.error('Error fetching question:', error);
      setComments([]); // Reset comments on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchQuestionAndComments();
  }, [id]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-600">Question not found.</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="space-y-8">
        {/* Question Content */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-xl font-medium text-gray-900 mb-8">
            {question.questionText}
          </h1>
          
          <div className="grid grid-cols-2 gap-4">
            {['A', 'B', 'C', 'D'].map((option) => (
              <div key={option} className="p-4 bg-gray-50 rounded-lg">
                <span className="font-medium">Option {option}:</span>
                <span className="ml-2">
                  {question[`option${option}` as keyof Question]}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-6 flex gap-2">
            {question.topic && (
              <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
                {question.topic}
              </span>
            )}
            {question.source && (
              <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                {question.source}
              </span>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <div className="bg-white rounded-lg shadow-sm p-8">
          <CommentSection
            questionId={question.id}
            comments={comments}
            onCommentAdded={fetchQuestionAndComments}
          />
        </div>
      </div>
    </div>
  );
}