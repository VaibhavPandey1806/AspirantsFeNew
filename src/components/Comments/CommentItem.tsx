import React from 'react';
import { ThumbsUp, ThumbsDown, MessageCircle } from 'lucide-react';
import { CommentItemProps } from '../../types/comment';

export default function CommentItem({
  comment,
  onReply,
  onLike,
  onUnlike,
  onDislike,
  isNested = false
}: CommentItemProps & { isNested?: boolean }) {
  return (
    <div className={`bg-white rounded-lg p-4 ${!isNested ? 'shadow-sm' : ''}`}>
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="font-medium">{comment.user?.name || 'Anonymous'}</span>
            <span className="text-sm text-gray-500">•</span>
            <span className="text-sm text-gray-500">{comment.dateTimeSubmitted}</span>
          </div>
          <p className="text-gray-700">{comment.text}</p>
          
          <div className="flex items-center gap-4 mt-2">
            <button
              onClick={() => comment.likedBy?.includes(comment.submittedBy || '') ? onUnlike(comment.id) : onLike(comment.id)}
              className={`flex items-center gap-1 text-sm ${
                comment.likedBy?.includes(comment.submittedBy || '') 
                  ? 'text-indigo-600' 
                  : 'text-gray-500 hover:text-indigo-600'
              }`}
            >
              <ThumbsUp size={16} />
              <span>{comment.likes}</span>
            </button>
            
            <button
              onClick={() => onDislike(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600"
            >
              <ThumbsDown size={16} />
              <span>{comment.dislikes}</span>
            </button>
            
            <button
              onClick={() => onReply(comment.id)}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-indigo-600"
            >
              <MessageCircle size={16} />
              <span>Reply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}