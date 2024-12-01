export interface Comment {
    id: string;
    text: string;
    submittedBy: string;
    likes: number;
    dislikes: number;
    likedBy: string[];
    dislikedBy: string[] | null;
    dateTimeSubmitted: string;
    replies: string[] | null;
  }
  
  export interface CommentWithUser extends Comment {
    user?: {
      name: string;
      username: string;
    };
    replyComments?: CommentWithUser[];
  }