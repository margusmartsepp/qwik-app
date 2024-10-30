import { component$ } from "@builder.io/qwik";
import type { ChatMessage } from "~/types/chat";
import { formatTimestamp } from "~/utils/date";

interface MessageProps {
  message: ChatMessage;
}

export const Message = component$<MessageProps>(({ message }) => {
  return (
    <div class={`message ${message.role}`}>
      <div class="message-content">{message.content}</div>
      <div class="message-metadata">
        <span class="timestamp">{formatTimestamp(message.timestamp)}</span>
      </div>
    </div>
  );
});