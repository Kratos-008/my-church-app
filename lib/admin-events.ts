'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function getAllEvents() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized')

  const res = await fetch(`${baseUrl}/api/admin/events`, { cache: 'no-store' })
  return res.json()
}

export async function createEvent(data: {
  title: string
  description: string
  location: string
  date: string
}) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized')

  const res = await fetch(`${baseUrl}/api/admin/events`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  return res.json()
}

export async function editEvent(data: {
  id: string
  title: string
  description: string
  location: string
  date: string
}) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized')

  const res = await fetch(`${baseUrl}/api/admin/events`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to update event')

  return res.json()
}

export async function deleteEvent(id: string) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') throw new Error('Unauthorized')

  const res = await fetch(`${baseUrl}/api/admin/events/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    cache: 'no-store',
  })

  if (!res.ok) throw new Error('Failed to delete event')

  return res.json()
}
