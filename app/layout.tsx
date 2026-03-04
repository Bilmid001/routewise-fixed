import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/AuthContext'

export const metadata: Metadata = {
  title: 'RouteWise — Smart Cross-Border Payment Optimizer',
  description: 'AI-powered payment route intelligence for SMEs. Compare 4 payment rails across 15 currencies.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{__html:`(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}})();`}} />
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}
