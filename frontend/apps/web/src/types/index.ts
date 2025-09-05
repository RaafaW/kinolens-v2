// Chat Types
export type Role = 'user' | 'assistant' | 'system';

export interface HistoryItem {
  role: Role;
  content: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant' | 'system';
  timestamp: Date;
  feedback?: 'positive' | 'negative';
  tokens?: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
  title?: string;
  totalTokens?: number;
}

// OpenAI API Types
export interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface OpenAIRequest {
  model: string;
  messages: OpenAIMessage[];
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  frequency_penalty?: number;
  presence_penalty?: number;
}

export interface OpenAIResponse {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: Array<{
    index: number;
    message: {
      role: string;
      content: string;
    };
    finish_reason: string;
  }>;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

// API Types
export interface ChatRequest {
  message: string;
  history?: HistoryItem[];
  language?: 'pt' | 'en';
  sessionId?: string;
  context?: string;
}
export interface ChatResponse {
  ok: boolean;
  reply: string;
  usage?: {
    prompt_tokens?: number;
    completion_tokens?: number;
    total_tokens?: number;
  };
  sessionId?: string;
}

export interface FeedbackRequest {
  messageId: string;
  feedback: 'positive' | 'negative';
  comment?: string;
}

// User & Auth Types
export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export type LoginCredentials = {
  email: string;
  password: string;
};

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
}

// Analytics Types
export interface AnalyticsEvent {
  event: string;
  properties: Record<string, any>;
  timestamp: Date;
  sessionId: string;
}

export interface TokenUsage {
  input: number;
  output: number;
  total: number;
  cost?: number;
}

// Component Props Types
export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  className?: string;
}

export interface InputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  multiline?: boolean;
  rows?: number;
  className?: string;
  onKeyPress?: (e: React.KeyboardEvent) => void;
}

// Error Types
export interface APIError {
  message: string;
  code: number;
  details?: any;
}

// Configuration Types
export interface AppConfig {
  apiUrl: string;
  openaiModel: string;
  maxTokens: number;
  temperature: number;
  enableAnalytics: boolean;
  gaId?: string;
}

// Movie/Cinema specific types for future use
export interface Movie {
  id: string;
  title: string;
  year: number;
  director: string;
  genre: string[];
  rating: number;
  poster?: string;
  synopsis?: string;
}

export interface CinemaContext {
  genres: string[];
  directors: string[];
  actors: string[];
  years: number[];
  userPreferences?: {
    favoriteGenres: string[];
    dislikedGenres: string[];
    favoriteDirectors: string[];
  };
}