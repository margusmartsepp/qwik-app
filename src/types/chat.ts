  export interface ChatMessage {
    id: string;
    content: string;
    role: "user" | "assistant";
    timestamp: number;
  }
  
  export interface ChatState {
    messages: ChatMessage[];
    isLoading: boolean;
    error: string | null;
  }
  
  export interface ChatResponse {
    text: string;
    timestamp: number;
  }
  
  export interface ChatService {
    sendMessage: (content: string) => Promise<ChatResponse>;
  }