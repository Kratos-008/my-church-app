'use server'

import { authOptions } from '@/lib/auth'
import { getServerSession } from 'next-auth'
import { prisma } from '@/lib/prisma'

type EventData = {
  title: string
  description: string
  location: string
  date: string
  time: string
}

type EventUpdateData = EventData & {
  id: string
}

async function requireAdminSession() {
  const session = await getServerSession(authOptions)
  if (!session || session.user.role !== 'ADMIN') {
    throw new Error('Unauthorized')
  }
  return session
}

export async function getAllEvents() {
  await requireAdminSession()
  return await prisma.event.findMany({ orderBy: { date: 'desc' } })
}

export async function createEvent(data: EventData) {
  await requireAdminSession()

  // Convert string date to Date object
  const formatted = {
    ...data,
    date: new Date(data.date),
  }

  return await prisma.event.create({ data: formatted })
}

export async function updateEvent(data: EventUpdateData) {
  await requireAdminSession()

  return await prisma.event.update({
    where: { id: data.id },
    data: {
      title: data.title,
      description: data.description,
      location: data.location,
      date: new Date(data.date),  // fix here too
    },
  })
}

export async function deleteEvent(id: string) {
  await requireAdminSession()
  return await prisma.event.delete({
    where: { id },
  })
}