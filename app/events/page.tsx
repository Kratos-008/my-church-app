// app/events/page.tsx
'use client'

import { getAllEventsPublic } from '@/lib/public-events'

export default async function EventsPage() {
  const events = await getAllEventsPublic()

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <ul className="space-y-2">
        {events.map((event: any) => (
          <li key={event.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-500">
              📍 {event.location} | 📅 {new Date(event.date).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  )
}
