import { component$ } from '@builder.io/qwik';
import type { ChatMessage } from '~/types/chat';

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
        <div 
          key={message.id} 
          class={`message message-${message.role}`}
        >
          <div class="message-content">{message.content}</div>
          <div class="message-timestamp">
            {new Date(message.timestamp).toLocaleTimeString()}
          </div>
        </div>
      ))}
      {isLoading && (
        <div class="message message-loading">
          <div class="loading-indicator">Thinking...</div>
        </div>
      )}
      {error && (
        <div class="message message-error">
          <div class="error-content">{error}</div>
        </div>
      )}
    </div>
  );
});