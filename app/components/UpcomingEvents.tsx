'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { EventData } from '@/types/events'
import { ChevronRight, MapPin, Clock, CalendarDays } from 'lucide-react'

export default function UpcomingEvents() {
  const [events, setEvents] = useState<EventData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch('/api/events?limit=3')
        if (!res.ok) throw new Error('Failed to fetch events')

        const { events } = await res.json() // ✅ get the actual array

        setEvents(events)
      } catch (error) {
        console.error('Failed to load events:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <section className="py-6 animate-fade-in max-w-md mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-3 px-4">
        <h3 className="text-xl font-semibold">Upcoming Events</h3>
        <Link
          href="/events"
          className="flex items-center text-sm border px-3 py-1 rounded hover:bg-gray-100 transition"
        >
          View All Events
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

      {loading ? (
        <div className="mt-4 text-gray-500 text-center">Loading...</div>
      ) : events.length === 0 ? (
        <div className="bg-gray-100 p-4 rounded shadow mt-4 text-center mx-4">
          <p>No upcoming events at this time.</p>
        </div>
      ) : (
        <div className="space-y-4 mt-4 px-4">
          {events.map((event) => {
            const eventDate = new Date(event.date)
            const timeFormatted = event.time
              ? new Date(`1970-01-01T${event.time}`).toLocaleTimeString(undefined, {
                  hour: 'numeric',
                  minute: '2-digit',
                  hour12: true,
                })
              : null

            return (
              <div key={event.id} className="bg-white p-4 rounded shadow">
                <h4 className="font-bold text-lg mb-1">{event.title}</h4>
                <p className="text-sm text-gray-600 mb-2">{event.description}</p>

                <div className="flex items-center text-sm text-gray-800 mb-1">
                  <CalendarDays className="w-4 h-4 mr-2 text-purple-600" />
                  {eventDate.toLocaleDateString(undefined, {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </div>

                {timeFormatted && (
                  <div className="flex items-center text-sm text-gray-800 mb-1">
                    <Clock className="w-4 h-4 mr-2 text-purple-600" />
                    {timeFormatted}
                  </div>
                )}

                <div className="flex items-center text-sm text-gray-800">
                  <MapPin className="w-4 h-4 mr-2 text-purple-600" />
                  {event.location}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
