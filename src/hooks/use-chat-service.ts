import { $, type QRL, useSignal, useTask$ } from "@builder.io/qwik";
import type { ChatResponse } from "~/types/chat";

export interface ChatService {
  sendMessage$: QRL<(content: string) => Promise<ChatResponse>>;
}

export const useChatService = (): ChatService => {
  const workerRef = useSignal<Worker>();

  useTask$(() => {
    workerRef.value = new Worker(
      new URL("../workers/llm-worker", import.meta.url),
      { type: "module" }
    );

    return () => {
      workerRef.value?.terminate();
    };
  });

  const sendMessage$ = $(async (content: string): Promise<ChatResponse> => {
    if (!workerRef.value) {
      throw new Error("Worker not initialized");
    }

    return new Promise((resolve, reject) => {
      const worker = workerRef.value!;
      const messageHandler = (event: MessageEvent) => {
        worker.removeEventListener("message", messageHandler);
        if ("error" in event.data) {
          reject(new Error(event.data.error));
        } else {
          resolve(event.data);
        }
      };

      worker.addEventListener("message", messageHandler);
      worker.postMessage({
        prompt: content,
        parameters: {
          temperature: 0.7,
          maxTokens: 1000
        }
      });
    });
  });

  return { sendMessage$ };
};