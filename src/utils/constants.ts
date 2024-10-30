export const APP_CONFIG = {
    APP_NAME: 'LLM-FLOW',
    API_VERSION: 'v1',
    CACHE_VERSION: '1',
    DEFAULT_LOCALE: 'en',
    SUPPORTED_LOCALES: ['en'],
  } as const;
  
  export const CACHE_KEYS = {
    CHAT_HISTORY: 'chat-history',
    USER_PREFERENCES: 'user-preferences',
    API_RESPONSES: 'api-responses',
  } as const;