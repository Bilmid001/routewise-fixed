import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RouteWise — Smart Cross-Border Payment Optimizer",
  description: "AI-powered payment route intelligence for SMEs. Compare, optimize, and settle cross-border transactions with maximum efficiency.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
