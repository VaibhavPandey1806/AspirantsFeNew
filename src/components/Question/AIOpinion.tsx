import React, { useState } from 'react';
import { Bot, Loader2 } from 'lucide-react';
import { getAIOpinion } from '../../utils/api';

interface AIOpinionProps {
  questionId: string;
  isTimerActive: boolean;
  showResult: boolean;
}

export default function AIOpinion({ questionId, isTimerActive, showResult }: AIOpinionProps) {
  const [opinion, setOpinion] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAIOpinion = async () => {
    if (!questionId || isLoading || !showResult) return;

    try {
      setIsLoading(true);
      setError(null);
      const { data } = await getAIOpinion(questionId);
      setOpinion(data);
    } catch (error) {
      console.error('Error fetching AI opinion:', error);
      setError('Failed to fetch AI explanation. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!showResult) return null;

  return (
    <div className="mt-8 space-y-4">
      {!opinion && !isLoading && (
        <button
          onClick={fetchAIOpinion}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg hover:from-indigo-600 hover:to-purple-600 transition-all duration-200"
        >
          <Bot size={20} />
          <span>Get AI Opinion</span>
        </button>
      )}

      {isLoading && (
        <div className="flex items-center justify-center gap-2 text-indigo-600 py-4">
          <Loader2 size={20} className="animate-spin" />
          <span>Analyzing question...</span>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-50 text-red-700 rounded-lg">
          {error}
          <button
            onClick={fetchAIOpinion}
            className="ml-2 text-indigo-600 hover:text-indigo-700 font-medium"
          >
            Try again
          </button>
        </div>
      )}

      {opinion && (
        <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6 space-y-4">
          <div className="flex items-center gap-2 text-indigo-600">
            <Bot size={24} />
            <h3 className="text-lg font-semibold">AI Analysis</h3>
          </div>
          <div className="prose prose-indigo max-w-none">
            {opinion.split('\n').map((paragraph, index) => (
              <p key={index} className="text-gray-700">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="text-xs text-gray-500 pt-4 border-t border-gray-200">
            Powered by ChatGPT
          </div>
        </div>
      )}
    </div>
  );
}