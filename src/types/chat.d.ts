export interface ChatMessage {
    id: string;
    content: string;
    role: 'user' | 'assistant';
    timestamp: number;
  }
  
  export interface ChatSession {
    id: string;
    messages: ChatMessage[];
    metadata: Record<string, unknown>;
  }
  
  export interface ChatState  {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
  };