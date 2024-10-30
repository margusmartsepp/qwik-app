import { component$ } from "@builder.io/qwik";
import type { ChatMessage } from "~/types/chat";
import { Message } from "./message";

interface MessageListProps {
  messages: ChatMessage[];
  isLoading: boolean;
  error: string | null;
}

export const MessageList = component$<MessageListProps>(({ 
  messages, 
  isLoading, 
  error 
}) => {
  return (
    <div class="message-list">
      {messages.map((message) => (
        <Message
          key={message.id}
          message={message}
        />
      ))}
      {isLoading && (
        <div class="loading-indicator">
          <span>Processing...</span>
        </div>
      )}
      {error && (
        <div class="error-message">
          {error}
        </div>
      )}
    </div>
  );
});