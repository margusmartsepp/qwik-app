import { $ } from "@builder.io/qwik";
import type { AnalyticsEvent, AnalyticsService } from "~/types/analytics";
import { getSessionId } from "../utils/session";
export const useAnalytics = (): AnalyticsService => {
  const trackEvent = $(async (event: AnalyticsEvent) => {
    try {
      // Implement your analytics service here
      await fetch("/api/analytics", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...event,
          timestamp: Date.now(),
          sessionId: getSessionId(),
        }),
      });
    } catch (error) {
      console.error("Analytics error:", error);
    }
  });

  return { trackEvent };
};
