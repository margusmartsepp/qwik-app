export const getSessionId = (): string => {
  if (typeof window === 'undefined') return '';
  
  let sessionId = window.sessionStorage.getItem("sessionId");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    window.sessionStorage.setItem("sessionId", sessionId);
  }
  return sessionId;
};