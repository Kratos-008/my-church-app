// app/admin/events/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getAllEvents } from '@/lib/admin-events'
import AdminEventClient from './EventClient'

export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/signin')
  if (session.user.role !== 'ADMIN') redirect('/')

  const events = await getAllEvents()

  return <AdminEventClient events={events} />
}
