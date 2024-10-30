/// <reference types="@builder.io/qwik" />

declare global {
    interface Window {
      TextDecoder: typeof TextDecoder;
    }
    interface ServiceWorkerGlobalScope {
      skipWaiting(): void;
      clients: Clients;
    }
  
    interface WindowEventMap {
      'beforeinstallprompt': BeforeInstallPromptEvent;
    }
  }
  
