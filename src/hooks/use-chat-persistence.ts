import { $, useTask$ } from "@builder.io/qwik";
import type { ChatMessage } from "~/types/chat";
import { useStorageService } from "~/services/storage";

export const useChatPersistence = () => {
  const storage = useStorageService();

  const persistMessages = $(async (messages: ChatMessage[]) => {
    await storage.saveMessages(messages);
  });

  const loadPersistedMessages = $(async () => {
    return await storage.loadMessages();
  });

  useTask$(({ track }) => {
    track(() => storage);
    loadPersistedMessages();
  });

  return {
    persistMessages,
    loadPersistedMessages,
  };
};