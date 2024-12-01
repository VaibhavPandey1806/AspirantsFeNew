import React, { useState, useEffect } from 'react';
import { CommentWithUser } from '../../types/comment';
import { getCommentById, getUserById, addReply, likeComment, unlikeComment, dislikeComment, hasLiked } from '../../utils/api';
import CommentItem from './CommentItem';
import CommentForm from './CommentForm';

interface CommentSectionProps {
  commentIds: string[] | null;
}

export default function CommentSection({ commentIds }: CommentSectionProps) {
  const [comments, setComments] = useState<CommentWithUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      if (!commentIds) {
        setComments([]);
        setIsLoading(false);
        return;
      }

      try {
        const commentsWithUsers = await Promise.all(
          commentIds.map(async (id) => {
            const { data: comment } = await getCommentById(id);
            const { data: user } = await getUserById(comment.submittedBy);

            // Fetch replies if they exist
            let replyComments: CommentWithUser[] = [];
            if (comment.replies) {
              replyComments = await Promise.all(
                comment.replies.map(async (replyId) => {
                  const { data: reply } = await getCommentById(replyId);
                  const { data: replyUser } = await getUserById(reply.submittedBy);
                  return { ...reply, user: replyUser };
                })
              );
            }

            return { ...comment, user, replyComments };
          })
        );

        setComments(commentsWithUsers);
      } catch (error) {
        console.error('Error fetching comments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [commentIds]);

  const handleReply = async (commentId: string, text: string) => {
    try {
      const { data: newComment } = await addReply(commentId, text);
      const { data: user } = await getUserById(newComment.submittedBy);
      
      setComments(prevComments => {
        return prevComments.map(comment => {
          if (comment.id === commentId) {
            return {
              ...comment,
              replyComments: [
                ...(comment.replyComments || []),
                { ...newComment, user }
              ]
            };
          }
          return comment;
        });
      });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      const { data: updatedComment } = await likeComment(commentId);
      updateCommentInState(commentId, updatedComment);
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  };

  const handleUnlike = async (commentId: string) => {
    try {
      const { data: updatedComment } = await unlikeComment(commentId);
      updateCommentInState(commentId, updatedComment);
    } catch (error) {
      console.error('Error unliking comment:', error);
    }
  };

  const handleDislike = async (commentId: string) => {
    try {
      const { data: updatedComment } = await dislikeComment(commentId);
      updateCommentInState(commentId, updatedComment);
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  };

  const updateCommentInState = (commentId: string, updatedComment: CommentWithUser) => {
    setComments(prevComments => {
      return prevComments.map(comment => {
        if (comment.id === commentId) {
          return { ...updatedComment, user: comment.user };
        }
        return comment;
      });
    });
  };

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-lg p-4">
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-900">
        Comments ({comments.length})
      </h2>
      
      <div className="space-y-6">
        {comments.map((comment) => (
          <CommentItem
            key={comment.id}
            comment={comment}
            onReply={handleReply}
            onLike={handleLike}
            onUnlike={handleUnlike}
            onDislike={handleDislike}
            currentUserLiked={comment.likedBy?.includes(comment.submittedBy) || false}
          />
        ))}
      </div>
    </div>
  );
}