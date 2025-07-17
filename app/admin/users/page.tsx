'use client'

import { useEffect, useState } from 'react'
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'
import Link from 'next/link'

interface User {
  id: string
  name?: string
  email: string
  role: string
}

export default function ManageUsersPage() {
  const { data: session, status } = useSession()
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch('/api/admin/users')
      const data = await res.json()
      setUsers(data)
    }

    if (session?.user.role === 'ADMIN') fetchUsers()
  }, [session])

  if (status === 'loading') return <div className="p-6">Loading...</div>
  if (!session || session.user.role !== 'ADMIN') redirect('/auth/signin')

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <table className="w-full table-auto border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Role</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td className="p-2 border">{user.name || '-'}</td>
              <td className="p-2 border">{user.email}</td>
              <td className="p-2 border">{user.role}</td>
              <td className="p-2 border">
                <button className="text-blue-600 hover:underline mr-2">Edit</button>
                <button className="text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link href="/admin" className="mt-6 inline-block text-sm text-gray-500 hover:text-black">
        ← Back to Dashboard
      </Link>
    </div>
  )
}
