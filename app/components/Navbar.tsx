'use client'

import Link from 'next/link'
import { Heart } from 'lucide-react'

export default function Navbar() {
  return (
    <header className="bg-gradient-to-r from-indigo-700 to-purple-600 text-white animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* Left logo and title */}
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1">
            <Heart className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h1 className="font-bold text-lg">Masbate Good News Baptist Church</h1>
            <p className="text-sm">Purok 7 Punta Nursery, Masbate City</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-x-4 text-sm hidden md:block">
          <Link href="/" className="hover:underline">Home</Link>
          <Link href="/events" className="hover:underline">Events</Link>
          <Link href="/services" className="hover:underline">Services</Link>
          <Link href="/youth" className="hover:underline">Youth</Link>
          <Link href="/prayer" className="hover:underline">Prayer</Link>
          <Link href="/contact" className="hover:underline">Contact</Link>
        </nav>
      </div>
    </header>
  )
}
