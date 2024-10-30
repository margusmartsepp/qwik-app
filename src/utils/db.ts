import { openDB, type IDBPDatabase } from 'idb';

interface LLMFlowDB {
  conversations: {
    key: string;
    value: {
      id: string;
      messages: Array<{
        role: 'user' | 'assistant';
        content: string;
        timestamp: number;
      }>;
      metadata: Record<string, any>;
    };
  };
  cache: {
    key: string;
    value: {
      response: string;
      timestamp: number;
      parameters: Record<string, any>;
    };
  };
}

export class Database {
  private db!: IDBPDatabase<LLMFlowDB>;

  async initialize(): Promise<void> {
    this.db = await openDB<LLMFlowDB>('llm-flow', 1, {
      upgrade(db) {
        db.createObjectStore('conversations', { keyPath: 'id' });
        db.createObjectStore('cache', { keyPath: 'id' });
      },
    });
  }

  async saveConversation(conversation: LLMFlowDB['conversations']['value']): Promise<void> {
    await this.db.put('conversations', conversation);
  }

  async getConversation(id: string): Promise<LLMFlowDB['conversations']['value'] | undefined> {
    return await this.db.get('conversations', id);
  }

  async cacheResponse(id: string, value: Omit<LLMFlowDB['cache']['value'], 'id'>): Promise<void> {
    await this.db.put('cache', { id, ...value });
  }

  async getCachedResponse(id: string): Promise<LLMFlowDB['cache']['value'] | undefined> {
    return await this.db.get('cache', id);
  }
}