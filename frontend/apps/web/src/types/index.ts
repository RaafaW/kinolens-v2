import type { Path, UseFormRegister, FieldErrors } from 'react-hook-form';

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

export interface ChatMessageProps {
  message: ChatMessage;
  onFeedback: (messageId: string, feedback: 'positive' | 'negative') => void;
}

export interface ChatInputProps {
  inputValue: string;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  isLoading: boolean;
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

export type RegisterCredentials = {
  fullName: string;
  cpf: string;
  birthDate: string;
  email: string;
  password: string;
};

export interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (credentials: RegisterCredentials) => Promise<void>;
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
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
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

export interface FormFieldProps {
  name: Path<RegisterCredentials>;
  label: string;
  type?: string;
  placeholder?: string;
  icon: React.ElementType;
  register: UseFormRegister<RegisterCredentials>;
  errors: FieldErrors<RegisterCredentials>;
  validation?: object;
}