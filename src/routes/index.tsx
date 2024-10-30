import { component$, useStore, $ } from '@builder.io/qwik';
import type { DocumentHead } from '@builder.io/qwik-city';
import { ChatInput } from '~/components/chat/ChatInput';
import { MessageList } from '../components/chat/MessageList';
import type { ChatState } from '~/types/chat';

export default component$(() => {
  const chatState = useStore<ChatState>({
    messages: [],
    isLoading: false,
    error: null
  });

  const handleMessage = $(async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: crypto.randomUUID(),
      content,
      role: 'user' as const,
      timestamp: Date.now()
    };

    chatState.messages = [...chatState.messages, userMessage];
    chatState.isLoading = true;
    chatState.error = null;

    try {
      // Simulate LLM response (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 10));
      
      const assistantMessage = {
        id: crypto.randomUUID(),
        content: `Response to: ${content}`,
        role: 'assistant' as const,
        timestamp: Date.now()
      };

      chatState.messages = [...chatState.messages, assistantMessage];
    } catch (error) {
      chatState.error = error instanceof Error 
        ? error.message 
        : 'An error occurred while processing your message';
    } finally {
      chatState.isLoading = false;
    }
  });

  return (
    <div class="chat-container">
      <h1>LLM-FLOW</h1>
      <MessageList
        messages={chatState.messages}
        isLoading={chatState.isLoading}
        error={chatState.error}
      />
      <ChatInput onSubmit$={handleMessage} />
    </div>
  );
});

export const head: DocumentHead = {
  title: 'LLM-FLOW',
  meta: [
    {
      name: 'description',
      content: 'A highly optimized web interface for LLM interactions'
    }
  ]
};