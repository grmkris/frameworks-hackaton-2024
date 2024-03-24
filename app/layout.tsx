
import type { Metadata } from "next";
import "./globals.css";
import {PrivyProvider} from "@privy-io/react-auth";
import {Privy} from "./components/Privy";

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
      <Privy>
        {children}
      </Privy>
      </body>
    </html>
  );
}
