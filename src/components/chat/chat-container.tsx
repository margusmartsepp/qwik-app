import { component$, useStore, useTask$, $ } from "@builder.io/qwik";
import type { ChatMessage, ChatState } from "~/types/chat";
import { useChatService } from "~/hooks/use-chat-service";
import { ChatInput } from "./ChatInput";
import { MessageList } from "./message-list";
import { getSessionId } from "../../utils/session";

export const ChatContainer = component$(() => {
  const chatState = useStore<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const chatService = useChatService();

  const sessionId = getSessionId();

  useTask$(({ track }) => {
    track(() => chatState.messages.length);
    if (typeof document !== 'undefined') {
      const element = document.getElementById('chat-end');
      element?.scrollIntoView({ behavior: "smooth" });
    }
  });

  const handleSubmit$ = $(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      content,
      role: "user",
      timestamp: Date.now()
    };

    chatState.messages = [...chatState.messages, userMessage];
    chatState.isLoading = true;
    chatState.error = null;

    try {
      const response = await chatService.sendMessage$(content);
      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        content: response.text,
        role: "assistant",
        timestamp: Date.now()
      };
      chatState.messages = [...chatState.messages, assistantMessage];
    } catch (error) {
      chatState.error = error instanceof Error ? error.message : "An error occurred";
    } finally {
      chatState.isLoading = false;
    }
  });

  return (
    <div class="chat-container">
      <MessageList 
        messages={chatState.messages} 
        isLoading={chatState.isLoading}
        error={chatState.error}
      />
      <div id="chat-end" />
      <ChatInput 
        onSubmit$={handleSubmit$}
        disabled={chatState.isLoading}
      />
    </div>
  );
});