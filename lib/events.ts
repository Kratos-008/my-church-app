// lib/events.ts or lib/actions/eventActions.ts
'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function getAllEvents() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch(`${baseUrl}/api/admin/events`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}

export async function createEvent(data: {
  title: string
  description: string
  date: string
  location: string
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch(`${baseUrl}/api/admin/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to create event')
  }

  return res.json()
}
