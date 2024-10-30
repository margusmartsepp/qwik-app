export interface AnalyticsEvent {
    name: string;
    properties?: Record<string, unknown>;
    category?: string;
    label?: string;
    value?: number;
  }
  
  export interface AnalyticsService {
    trackEvent: (event: AnalyticsEvent) => Promise<void>;
  }