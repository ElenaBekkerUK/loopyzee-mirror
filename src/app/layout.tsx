// src/app/layout.tsx
import type { Metadata } from "next";
import { QueryProvider } from "@/components/QueryProvider";
import { ToastProvider } from "@/components/ui/toast"; 

import "@/styles/theme.css.ts";
import "@/styles/theme-light.css.ts";
import "@/styles/theme-dark.css.ts";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Loopyzee",
  description: "Create and customize invitations with ease",
  icons: {
    icon: "/favicon.svg",
    other: [{ rel: "alternate icon", url: "/favicon.ico" }],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/favicon.ico" />
      </head>
      <body>
        <QueryProvider>
          <ToastProvider>{children}</ToastProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
