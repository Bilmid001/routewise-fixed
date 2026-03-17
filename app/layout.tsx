import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/lib/AuthContext'
import { LangProvider } from '@/lib/LangContext'
export const metadata: Metadata = { title:'RouteWise — Payment Intelligence', description:'AI-powered payment route optimizer for SMEs.' }
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <script dangerouslySetInnerHTML={{__html:`(function(){var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark')}})();`}}/>
        <AuthProvider><LangProvider>{children}</LangProvider></AuthProvider>
      </body>
    </html>
  )
}
