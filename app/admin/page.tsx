import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/auth/signin')
  if (session.user.role !== 'ADMIN') redirect('/unauthorized')

  return (
    <div>
      <h1 className="text-2xl font-bold">Welcome, Admin!</h1>
    </div>
  )
}
