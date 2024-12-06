export interface LoginCredentials {
    username: string;
    password: string;
  }
  
  export interface AuthResponse {
    success: boolean;
    message?: string;
  }
  
  export interface LoginRequest {
    username: string;
    password: string;
  }