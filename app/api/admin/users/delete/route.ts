import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'

const prisma = new PrismaClient()

export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return new NextResponse(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const { id } = await req.json()

  if (!id) {
    return new NextResponse(JSON.stringify({ error: 'Missing user ID' }), { status: 400 })
  }

  await prisma.user.delete({ where: { id } })

  return NextResponse.json({ message: 'User deleted' })
}
