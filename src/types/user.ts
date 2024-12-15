export interface User {
  id: string;
  name: string;
  username: string;
  emailId?: string; // Changed from email to emailId
  mobile?: string;
}