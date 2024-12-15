import { useState, useCallback } from 'react';
import { 
  getCommentById,
  getUserById,
  likeComment,
  unlikeComment,
  dislikeComment,
  addReply
} from '../api';
import type { Comment } from '../types/comment';

export function useComments(onCommentAdded: () => void) {
  const [isReplying, setIsReplying] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchCommentWithUserData = async (commentId: string): Promise<Comment | null> => {
    if (!commentId) return null;

    try {
      const { data: comment } = await getCommentById(commentId);
      
      if (!comment) return null;

      // Fetch user data for the comment author
      if (comment.submittedBy) {
        try {
          const { data: userData } = await getUserById(comment.submittedBy);
          comment.user = {
            name: userData.name || 'Anonymous',
            username: userData.username
          };
        } catch (error) {
          console.error('Error fetching user data:', error);
          comment.user = { name: 'Anonymous', username: '' };
        }
      }

      // Recursively fetch replies
      if (comment.replies && Array.isArray(comment.replies)) {
        const replyIds = comment.replies.map(reply => 
          typeof reply === 'string' ? reply : reply.id
        );
        
        const replyPromises = replyIds.map(replyId => fetchCommentWithUserData(replyId));
        const resolvedReplies = await Promise.all(replyPromises);
        comment.replies = resolvedReplies.filter(Boolean) as Comment[];
      } else {
        comment.replies = [];
      }

      return comment;
    } catch (error) {
      console.error(`Error fetching comment ${commentId}:`, error);
      return null;
    }
  };

  const fetchComments = async (commentIds: string[]): Promise<Comment[]> => {
    if (!Array.isArray(commentIds) || commentIds.length === 0) {
      return [];
    }

    try {
      setIsLoading(true);
      const commentPromises = commentIds.map(fetchCommentWithUserData);
      const comments = await Promise.all(commentPromises);
      return comments.filter(Boolean) as Comment[];
    } catch (error) {
      console.error('Error fetching comments:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleReply = useCallback((commentId: string | null) => {
    setIsReplying(commentId);
  }, []);

  const handleLike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await likeComment(commentId);
      onCommentAdded();
    } catch (error) {
      console.error('Error liking comment:', error);
    }
  }, [onCommentAdded]);

  const handleUnlike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await unlikeComment(commentId);
      onCommentAdded();
    } catch (error) {
      console.error('Error unliking comment:', error);
    }
  }, [onCommentAdded]);

  const handleDislike = useCallback(async (commentId: string) => {
    if (!commentId) return;
    try {
      await dislikeComment(commentId);
      onCommentAdded();
    } catch (error) {
      console.error('Error disliking comment:', error);
    }
  }, [onCommentAdded]);

  const handleReplySubmit = useCallback(async (commentId: string, text: string) => {
    if (!commentId || !text.trim()) return;
    try {
      await addReply(commentId, text.trim());
      setIsReplying(null);
      onCommentAdded();
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  }, [onCommentAdded]);

  return {
    isReplying,
    isLoading,
    fetchComments,
    handleReply,
    handleLike,
    handleUnlike,
    handleDislike,
    handleReplySubmit
  };
}