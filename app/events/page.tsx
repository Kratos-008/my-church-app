'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { CalendarX, CalendarDays, Clock, MapPin } from 'lucide-react'

type Event = {
  id: string
  title: string
  description: string
  location: string
  date: string
  time: string
}

// Utility: Get event label (Today, Tomorrow, This Week)
function getEventLabel(dateStr: string): string | null {
  const today = new Date()
  const eventDate = new Date(dateStr)

  // Remove time portion for accurate comparison
  today.setHours(0, 0, 0, 0)
  eventDate.setHours(0, 0, 0, 0)

  const diffDays = Math.round((eventDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Today'
  if (diffDays === 1) return 'Tomorrow'

  // Check if event is within this week
  const startOfWeek = new Date(today)
  startOfWeek.setDate(today.getDate() - today.getDay()) // Sunday
  const endOfWeek = new Date(startOfWeek)
  endOfWeek.setDate(startOfWeek.getDate() + 6) // Saturday

  return eventDate >= startOfWeek && eventDate <= endOfWeek ? 'This Week' : null
}

export default function ChurchEventsPage() {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchEvents = async () => {
  try {
    const res = await fetch('/api/events?past=false');
    const data = await res.json()
    setEvents(Array.isArray(data.events) ? data.events : [])
  } catch (err) {
    console.error('Failed to fetch events:', err)
  } finally {
    setLoading(false)
  }
}


    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans tracking-normal leading-relaxed">
      {/* Topbar */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
        <div className="flex items-center gap-2 text-sm">
          <Link href="/" className="hover:underline">← Back to Home</Link>
          <span>•</span>
          <span className="font-semibold">Church Events</span>
        </div>
      </div>

      {/* Header */}
      <div className="text-center py-10 px-4">
        <h1 className="text-3xl font-extrabold text-gray-900">Upcoming Events</h1>
        <p className="text-lg text-gray-600 mt-2 max-w-2xl mx-auto">
          Join us for these special events and activities in our church community. Everyone is welcome!
        </p>
      </div>

      {/* Event List or Empty */}
      <div className="px-4 max-w-5xl mx-auto pb-10">
        {loading ? (
          <div className="text-center text-gray-500 py-10">Loading events...</div>
        ) : events.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
            <CalendarX className="w-16 h-16 mb-4 text-gray-400" />
            <h2 className="text-lg font-semibold">No Events Scheduled</h2>
            <p className="max-w-md mt-2">
              We don’t have any upcoming events scheduled at the moment. Check back soon for new activities and gatherings!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => {
              const label = getEventLabel(event.date)
              return (
                <div
                  key={event.id}
                  className="bg-purple-50 border border-purple-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>

                  {label && (
                    <span className="inline-block bg-purple-100 text-purple-700 text-xs font-semibold px-3 py-1 rounded-full mb-4">
                      {label}
                    </span>
                  )}

                  <p className="text-sm text-gray-700 mb-4">{event.description}</p>

                  <div className="flex items-center text-sm text-gray-800 mb-2">
                    <CalendarDays className="w-4 h-4 mr-2 text-purple-600" />
                    {new Date(event.date).toLocaleDateString(undefined, {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </div>

                  <div className="flex items-center text-sm text-gray-800 mb-2">
                    <Clock className="w-4 h-4 mr-2 text-purple-600" />
                    {new Date(`1970-01-01T${event.time}`).toLocaleTimeString(undefined, {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true,
                    })}
                  </div>

                  <div className="flex items-center text-sm text-gray-800">
                    <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                    {event.location}
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Stay Updated CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-12 px-4">
        <h2 className="text-2xl font-bold mb-3">Want to Stay Updated?</h2>
        <p className="text-md mb-6 max-w-xl mx-auto">
          Join our church community and never miss an event. Contact us to get involved!
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-gray-200 transition"
          >
            Contact Us
          </Link>
          <Link href="/" 
          className="bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-gray-200 transition">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
