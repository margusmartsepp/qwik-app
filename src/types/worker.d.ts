  // src/types/worker.d.ts
  interface LLMWorkerMessage {
    type: 'process' | 'cancel';
    payload: unknown;
  }
  
  interface LLMWorkerResponse {
    type: 'success' | 'error' | 'progress';
    payload: unknown;
  }