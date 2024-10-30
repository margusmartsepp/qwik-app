import { component$, useStore, $, type QRL } from '@builder.io/qwik';
import { type ChatMessage } from '~/types/chat';

interface ChatInputState {
  input: string;
  isSubmitting: boolean;
}

export interface ChatInputProps {
  onSubmit$: QRL<(content: string) => Promise<void>>;
  disabled: boolean;
}

export const ChatInput = component$<ChatInputProps>(({ onSubmit$ }) => {
  const state = useStore<ChatInputState>({
    input: '',
    isSubmitting: false
  });

  const handleSubmit = $(async () => {
    if (!state.input.trim() || state.isSubmitting) return;

    state.isSubmitting = true;
    try {
      await onSubmit$(state.input);
      state.input = '';
    } finally {
      state.isSubmitting = false;
    }
  });

  return (
    <div class="chat-input-container">
      <textarea
        value={state.input}
        onChange$={(e) => state.input = (e.target as HTMLTextAreaElement).value}
        placeholder="Type your message..."
        disabled={state.isSubmitting}
      />
      <button onClick$={handleSubmit} disabled={state.isSubmitting}>
        Send
      </button>
    </div>
  );
});