import {
    QueryClient,
    QueryClientProvider,
} from '@tanstack/react-query'
import type { Metadata } from "next";
import "./globals.css";
import {Privy} from "./components/Privy";

export const metadata: Metadata = {
  // without a title, warpcast won't validate your frame
  title: "frames.js starter",
  description: "...",
};
const queryClient = new QueryClient()
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
      <QueryClientProvider client={queryClient}>
      <Privy>
        {children}
      </Privy>
          </QueryClientProvider>
      </body>
    </html>
  );
}
