import '../styles/globals.css'
import type { Metadata } from 'next'
import { Providers } from './providers' // 👈 make sure this path is correct

export const metadata: Metadata = {
  title: 'Masbate Good News Baptist Church',
  description: 'Official church website for MGNBC',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers> {/* ✅ Wrap all app content in SessionProvider */}
      </body>
    </html>
  )
}