import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { getAllEvents } from '@/lib/admin-events'
import AdminEventClient from './EventClient'
import { getServerSession } from 'next-auth'


export default async function AdminEventsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/auth/signin')
  }
  
  if (session.user.role !== 'ADMIN') {
    return redirect('/')
  }

  const events = await getAllEvents()

  return <AdminEventClient events={events} />
}