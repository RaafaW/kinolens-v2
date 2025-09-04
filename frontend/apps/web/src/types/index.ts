// Chat Types
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
  sessionId?: string;
  context?: string;
}

export interface ChatResponse {
  message: string;
  sessionId: string;
  tokens: number;
  model: string;
}

export interface FeedbackRequest {
  messageId: string;
  feedback: 'positive' | 'negative';
  comment?: string;
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