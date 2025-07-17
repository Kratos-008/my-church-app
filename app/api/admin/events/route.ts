import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const events = await prisma.event.findMany({ orderBy: { date: 'asc' } })
  return NextResponse.json(events)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { title, description, date, location } = await req.json()

  if (!title || !description || !date || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const event = await prisma.event.create({
    data: {
      title,
      description,
      date: new Date(date),
      location,
    },
  })

  return NextResponse.json(event)
}

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { id, title, description, date, location } = await req.json()

  if (!id || !title || !description || !date || !location) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
  }

  const updated = await prisma.event.update({
    where: { id },
    data: {
      title,
      description,
      location,
      date: new Date(date),
    },
  })

  return NextResponse.json(updated)
}
