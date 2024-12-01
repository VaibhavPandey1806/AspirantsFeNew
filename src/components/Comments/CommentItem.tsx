import React, { useState } from 'react';
import { CommentWithUser } from '../../types/comment';
import CommentActions from './CommentActions';
import CommentForm from './CommentForm';

interface CommentItemProps {
  comment: CommentWithUser;
  onReply: (commentId: string, text: string) => void;
  onLike: (commentId: string) => void;
  onUnlike: (commentId: string) => void;
  onDislike: (commentId: string) => void;
  currentUserLiked: boolean;
}

export default function CommentItem({
  comment,
  onReply,
  onLike,
  onUnlike,
  onDislike,
  currentUserLiked
}: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const handleReply = (text: string) => {
    onReply(comment.id, text);
    setShowReplyForm(false);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg p-4">
        <div className="flex items-start gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <span className="font-medium">{comment.user?.name || 'Unknown User'}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{comment.dateTimeSubmitted}</span>
            </div>
            <p className="text-gray-700">{comment.text}</p>
            
            <CommentActions
              likes={comment.likes}
              dislikes={comment.dislikes}
              hasLiked={currentUserLiked}
              onLike={() => onLike(comment.id)}
              onUnlike={() => onUnlike(comment.id)}
              onDislike={() => onDislike(comment.id)}
              onReply={() => setShowReplyForm(true)}
            />
            
            {showReplyForm && (
              <div className="mt-4">
                <CommentForm
                  onSubmit={handleReply}
                  placeholder="Write a reply..."
                  buttonText="Reply"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Replies */}
      {comment.replyComments && comment.replyComments.length > 0 && (
        <div className="ml-8 space-y-4">
          {comment.replyComments.map((reply) => (
            <CommentItem
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onLike={onLike}
              onUnlike={onUnlike}
              onDislike={onDislike}
              currentUserLiked={reply.likedBy?.includes(reply.submittedBy) || false}
            />
          ))}
        </div>
      )}
    </div>
  );
}