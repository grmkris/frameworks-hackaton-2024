import type { Metadata } from "next";

import "./globals.css";

import React from "react";
import { ToastContainer } from "react-toastify";

import { Privy } from "./components/Privy";
import { TanstackQueryProvider } from "./components/TanstackQueryProvider";

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
        <ToastContainer />
        <TanstackQueryProvider>
          <Privy>{children}</Privy>
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
