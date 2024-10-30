export class TextDecoder {
    private buffer: string = "";
  
    append(chunk: Uint8Array): string {
      this.buffer += new window.TextDecoder().decode(chunk);
      return this.buffer;
    }
  
    clear(): void {
      this.buffer = "";
    }
  }
  
  export const streamAsyncIterable = async function* (
    stream: ReadableStream<Uint8Array>
  ): AsyncIterableIterator<string> {
    const reader = stream.getReader();
    const decoder = new TextDecoder();
  
    try {
      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }
        yield decoder.append(value);
      }
    } finally {
      reader.releaseLock();
    }
  };