import { NextResponse } from 'next/server'
import { PrismaClient, Role } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

const prisma = new PrismaClient()

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { id, role } = await req.json()

  if (!id || !role || !['ADMIN', 'USER'].includes(role)) {
    return new NextResponse(JSON.stringify({ error: 'Invalid data' }), { status: 400 })
  }

  const updated = await prisma.user.update({
    where: { id },
    data: { role: role as Role },
  })

  return NextResponse.json(updated)
}
