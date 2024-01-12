"use client";
import * as React from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { DirectionProvider, MantineProvider, createTheme } from "@mantine/core";
import { GoogleAnalytics } from "nextjs-google-analytics";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "@mantine/core/styles.css";

const theme = createTheme({
  primaryColor: "gray",
  colors: {
    gray: [
      "#f9fafb",
      "#f3f4f6",
      "#e5e7eb",
      "#d1d5db",
      "#9ca3af",
      "#6b7280",
      "#4b5563",
      "#374151",
      "#1f2937",
      "#111827",
      "#030712",
    ],
  },
});
export const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 5 * 1000,
          },
        },
      }),
  );
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <DirectionProvider>
          <MantineProvider theme={theme} defaultColorScheme="light">
            {children}
          </MantineProvider>
        </DirectionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <SpeedInsights />
      <Analytics />
      <GoogleAnalytics trackPageViews strategy="lazyOnload" />
    </>
  );
};
