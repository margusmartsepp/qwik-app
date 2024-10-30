export class ChatError extends Error {
    constructor(
      message: string,
      public readonly code: string,
      public readonly details?: unknown
    ) {
      super(message);
      this.name = "ChatError";
    }
  }
  
  export const handleChatError = (error: unknown): string => {
    if (error instanceof ChatError) {
      return `Error (${error.code}): ${error.message}`;
    }
    if (error instanceof Error) {
      return error.message;
    }
    return "An unexpected error occurred";
  };