// app/admin/page.tsx
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth.config'
import { redirect } from 'next/navigation'
import Link from 'next/link'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== 'ADMIN') {
    redirect('/auth/signin')
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-6 space-y-4">
        <h2 className="text-xl font-bold">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin" className="block hover:text-orange-400">Dashboard</Link>
          <Link href="/admin/users" className="block hover:text-orange-400">Manage Users</Link>
          <Link href="/admin/events" className="block hover:text-orange-400">Manage Events</Link>
          <Link href="/admin/prayers" className="block hover:text-orange-400">Prayer Requests</Link>
          <Link href="/" className="block text-sm text-gray-400 hover:text-gray-300 mt-10">← Back to Site</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 bg-white">
        <h1 className="text-2xl font-bold mb-4">Welcome, Admin!</h1>
        <p className="text-gray-700">This is your admin dashboard where you can manage church content.</p>
      </main>
    </div>
  )
}
