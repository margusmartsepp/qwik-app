import { createContextId } from "@builder.io/qwik";
import { type Signal, useSignal } from "@builder.io/qwik";
import { Subject } from "rxjs";

export interface AppState {
  conversations: Map<string, Conversation>;
  currentConversationId: string | null;
  isProcessing: boolean;
  error: string | null;
}

export interface Conversation {
  id: string;
  messages: Message[];
  metadata: Record<string, any>;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
}

export const createStore = () => {
  const state: Signal<AppState> = useSignal({
    conversations: new Map(),
    currentConversationId: null,
    isProcessing: false,
    error: null
  });

  const stateUpdates$ = new Subject<Partial<AppState>>();

  stateUpdates$.subscribe((update) => {
    state.value = { ...state.value, ...update };
  });

  return { state, stateUpdates$ };
};

export const createAppStore = () => {
  const state = useSignal<AppState>({
    conversations: new Map(),
    currentConversationId: null,
    isProcessing: false,
    error: null
  });

  const updates$ = new Subject<Partial<AppState>>();

  updates$.subscribe((update) => {
    state.value = { ...state.value, ...update };
  });

  return {
    state,
    updates$
  };
};

export const { state, updates$ } = createAppStore();
export const AppContext = createContextId<Signal<AppState>>("app-context");