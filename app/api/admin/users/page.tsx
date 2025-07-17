'use server'

import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'

const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000'

export async function updateUserRole(id: string, role: 'ADMIN' | 'USER') {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch(`${baseUrl}/api/admin/users/edit`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id, role }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to update user role')
  }

  return res.json()
}

export async function deleteUser(id: string) {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Not authorized')
  }

  const res = await fetch(`${baseUrl}/api/admin/users/delete`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to delete user')
  }

  return res.json()
}
