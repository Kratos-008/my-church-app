'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Home, Calendar, Users, Menu, X } from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const links = [
    { href: '/admin', label: 'Dashboard', icon: <Home className="w-5 h-5" /> },
    { href: '/admin/events', label: 'Events', icon: <Calendar className="w-5 h-5" /> },
    { href: '/admin/users', label: 'Users', icon: <Users className="w-5 h-5" /> },
  ]

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-100 text-gray-900">
      {/* Mobile top bar */}
      <div className="flex items-center justify-between p-4 md:hidden bg-white shadow">
        <span className="font-bold text-lg">Admin Panel</span>
        <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-700">
          {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:static top-0 left-0 h-full w-64 bg-white shadow-md transform transition-transform z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-6 font-bold text-lg border-b hidden md:block">Admin Panel</div>
        <nav className="flex flex-col p-4 space-y-2">
          {links.map(({ href, label, icon }) => (
            <Link
              key={href}
              href={href}
              className="flex items-center space-x-2 p-2 rounded hover:bg-gray-100 transition"
              onClick={() => setSidebarOpen(false)} // close drawer on mobile
            >
              {icon}
              <span>{label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-30 z-30 md:hidden"
        />
      )}

      {/* Main content */}
      <main className="flex-1 p-4 mt-16 md:mt-0">{children}</main>
    </div>
  )
}