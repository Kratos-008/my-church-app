'use client'

import '../styles/globals.css'
import type { Metadata } from 'next'
import { SessionProvider } from 'next-auth/react'
import { Toaster } from 'react-hot-toast'

export const metadata: Metadata = {
  title: 'Masbate Good News Baptist Church',
  description: 'Official church website for MGNBC',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          {children}
          <Toaster position="top-right" />
        </SessionProvider>
      </body>
    </html>
  )
}