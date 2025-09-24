"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    // The '2025-05-24' default enables history-based pageview capturing for SPAs.
    defaults: '2025-05-24' 
  });
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // Only provide PostHog context if token is available
  if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
    return <PHProvider client={posthog}>{children}</PHProvider>;
  }
  // Return children directly if no PostHog token
  return <>{children}</>;
}
