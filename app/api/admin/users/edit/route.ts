'use server'

import { NextResponse } from 'next/server'
import { Role } from '@prisma/client'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function PATCH(req: Request) {
  const session = await auth()

  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, role } = await req.json()

  if (!id || !role || !['ADMIN', 'USER'].includes(role)) {
    return NextResponse.json({ error: 'Invalid data' }, { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { role: role as Role },
  })

  return NextResponse.json(updated)
}