// app/services/page.tsx
'use client'

import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { CalendarDays, Clock, Heart, Users, BookOpenCheck } from 'lucide-react'

export default function ServicesPage() {
  const router = useRouter()

  return (
    <main className="min-h-screen flex flex-col animate-fade-in">
      {/* Header Bar */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-4 py-3 flex items-center space-x-2">
        <button onClick={() => router.push('/')} className="text-sm hover:underline">
          ← Back to Home
        </button>
        <Heart className="w-4 h-4 text-white" />
        <span className="text-sm font-medium">Sunday Services</span>
      </div>

      {/* Hero Section */}
      <section className="text-center py-10 px-4">
        <h1 className="text-3xl font-bold mb-2">Sunday Services</h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Join us every Sunday for worship, fellowship, and spiritual growth. All are welcome in our church family!
        </p>

        <div className="mt-6 mx-auto max-w-sm bg-white shadow rounded-lg p-4">
          <p className="text-sm font-medium text-gray-500">Regular Service Time</p>
          <div className="flex items-center justify-center mt-2 space-x-2">
            <Clock className="w-4 h-4 text-blue-500" />
            <span className="text-blue-600 font-semibold">7:30 AM</span>
          </div>
          <p className="text-gray-500 mt-1 text-sm">Purok 7 Punta Nursery, Masbate City</p>
        </div>
      </section>

      {/* Upcoming Services */}
      <section className="text-center px-4 py-10">
        <h2 className="text-2xl font-bold mb-1">Upcoming Services</h2>
        <p className="text-gray-600 max-w-xl mx-auto mb-10">
          Here are our scheduled Sunday services. Each service includes worship, prayer, and a message from God's Word.
        </p>

        <div className="flex flex-col items-center">
          <div className="bg-gray-200 p-4 rounded-full mb-4">
            <CalendarDays className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="font-semibold mb-1">No Services Scheduled</h3>
          <p className="text-gray-500 max-w-md">
            We don't have any upcoming services scheduled at the moment. Our regular service is every Sunday at 7:30 AM.
          </p>
        </div>
      </section>

      {/* What to Expect */}
      <section className="bg-white px-4 py-14">
        <h2 className="text-center text-2xl font-bold mb-10">What to Expect</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          <div>
            <div className="bg-blue-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <Heart className="text-blue-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Worship</h3>
            <p className="text-gray-500 text-sm">Join us in heartfelt worship through songs, prayers, and praise to God.</p>
          </div>

          <div>
            <div className="bg-green-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <Users className="text-green-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">Fellowship</h3>
            <p className="text-gray-500 text-sm">Experience warm community and make lasting friendships with fellow believers.</p>
          </div>

          <div>
            <div className="bg-purple-100 w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-3">
              <BookOpenCheck className="text-purple-500 w-5 h-5" />
            </div>
            <h3 className="font-semibold mb-1">God's Word</h3>
            <p className="text-gray-500 text-sm">Hear inspiring messages from the Bible that encourage and guide your life.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-2">Join Us This Sunday!</h2>
        <p className="max-w-xl mx-auto mb-6">
          We'd love to have you join our church family. Come as you are and experience God's love with us.
        </p>
        <div className="space-x-4">
          <Link href="https://www.google.com/maps/place/Masbate+GoodNews+Baptist+Church/@12.3728127,123.6366301,20z/data=!4m6!3m5!1s0x33a6db1e1cdc0bc7:0x9a1c49406749d8a3!8m2!3d12.372778!4d123.6366023!16s%2Fg%2F11j4sk_g0d?hl=en-US&entry=ttu&g_ep=EgoyMDI1MDcxNi4wIKXMDSoASAFQAw%3D%3D" 
          target="_blank" className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100">Get Directions</Link>
          <Link href="/" className="bg-white text-blue-600 font-medium px-4 py-2 rounded hover:bg-gray-100">Back to Home</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-6 text-center">
        <div className="flex justify-center items-center space-x-2">
          <Heart className="w-4 h-4 text-white" />
          <span className="font-medium">Masbate Good News Baptist Church</span>
        </div>
        <p className="text-sm mt-1 text-gray-300">Purok 7 Punta Nursery, Masbate City</p>
      </footer>
    </main>
  )
}
