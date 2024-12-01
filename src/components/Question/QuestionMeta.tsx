import React from 'react';
import { User } from '../../types/user';

interface QuestionMetaProps {
  topic?: string;
  source?: string;
  submittedBy?: User;
  dateSubmitted?: string;
}

export default function QuestionMeta({ topic, source, submittedBy, dateSubmitted }: QuestionMetaProps) {
  return (
    <div className="mt-6 space-y-2">
      <div className="flex gap-2">
        {topic && (
          <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-sm">
            {topic}
          </span>
        )}
        {source && (
          <span className="px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
            {source}
          </span>
        )}
      </div>
      {(submittedBy || dateSubmitted) && (
        <div className="text-sm text-gray-500">
          {submittedBy && (
            <span>Submitted by {submittedBy.name}</span>
          )}
          {dateSubmitted && (
            <>
              <span className="mx-2">•</span>
              <span>{dateSubmitted}</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}