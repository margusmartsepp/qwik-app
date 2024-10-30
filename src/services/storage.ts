import { type Signal, useSignal, $ } from "@builder.io/qwik";
import type { ChatMessage } from "~/types/chat";
import { CACHE_KEYS } from "~/utils/constants";

export interface StorageService {
  saveMessages: (messages: ChatMessage[]) => Promise<void>;
  loadMessages: () => Promise<ChatMessage[]>;
  clearMessages: () => Promise<void>;
}

interface StorageState {
  initialized: boolean;
}

export const useStorageService = (): StorageService => {
  const state: Signal<StorageState> = useSignal({ initialized: false });

  const initialize = $(async () => {
    if (!state.value.initialized) {
      await initIndexedDB();
      state.value = { initialized: true };
    }
  });

  const saveMessages = $(async (messages: ChatMessage[]) => {
    await initialize();
    const db = await openDB();
    const tx = db.transaction(CACHE_KEYS.CHAT_HISTORY, "readwrite");
    const store = tx.objectStore(CACHE_KEYS.CHAT_HISTORY);
    await store.put({ id: "messages", data: messages });
  });

  const loadMessages = $(async () => {
    await initialize();
    const db = await openDB();
    const tx = db.transaction(CACHE_KEYS.CHAT_HISTORY, "readonly");
    const store = tx.objectStore(CACHE_KEYS.CHAT_HISTORY);
    const result = await store.get("messages") as unknown as { id: string; data: ChatMessage[] } | undefined;
    return result?.data ?? [];
  });

  const clearMessages = $(async () => {
    await initialize();
    const db = await openDB();
    const tx = db.transaction(CACHE_KEYS.CHAT_HISTORY, "readwrite");
    const store = tx.objectStore(CACHE_KEYS.CHAT_HISTORY);
    await store.clear();
  });

  return {
    saveMessages,
    loadMessages,
    clearMessages,
  };
};

async function initIndexedDB() {
  const db = await openDB();
  if (!db.objectStoreNames.contains(CACHE_KEYS.CHAT_HISTORY)) {
    db.createObjectStore(CACHE_KEYS.CHAT_HISTORY, { keyPath: "id" });
  }
}

async function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("llm-flow-db", 1);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(CACHE_KEYS.CHAT_HISTORY)) {
        db.createObjectStore(CACHE_KEYS.CHAT_HISTORY, { keyPath: "id" });
      }
    };
  });
}