'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'

export async function requireAdmin() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized access. Admins only.')
  }

  return session
}
