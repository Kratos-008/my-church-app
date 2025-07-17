// DELETE event by 
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
export async function deleteEvent(id: string) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch('/api/events/${id}', {
    method: 'DELETE',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to delete event')
  }

  return res.json()
}

// UPDATE event by ID
export async function updateEvent(id: string, data: {
  title?: string
  description?: string
  date?: string
  location?: string
}) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch('${baseUrl}/api/events/${id}', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to update event')
  }

  return res.json()
}