import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import type { Metadata } from "next";
import "./globals.css";
import {Privy} from "./components/Privy";
import React from "react";
import {TanstackQueryProvider} from "./components/TanstackQueryProvider";

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "frames.js starter",
  description: "...",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <TanstackQueryProvider>
      <Privy>
        {children}
      </Privy>
      </TanstackQueryProvider>
      </body>
    </html>
  );
}
