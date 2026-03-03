import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RouteWise — Smart Cross-Border Payment Optimizer",
  description: "AI-powered payment route intelligence for SMEs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{__html:`
          (function(){
            var t=localStorage.getItem('theme');
            if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
        {children}
      </body>
    </html>
  );
}
