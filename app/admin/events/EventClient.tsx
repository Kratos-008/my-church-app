'use client'

import { useState } from 'react'
import { createEvent, deleteEvent } from '@/lib/admin-events'

export default function AdminEventClient({ events: initialEvents }: { events: any[] }) {
  const [events, setEvents] = useState(initialEvents)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newEvent = await createEvent({ title, description, location, date })
    setEvents([...events, newEvent])
    setTitle('')
    setDescription('')
    setLocation('')
    setDate('')
  }

  const handleDelete = async (id: string) => {
    await deleteEvent(id)
    setEvents(events.filter((e) => e.id !== id))
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10 max-w-xl">
        <input
          type="text"
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <input
          type="date"
          className="w-full border p-2 rounded"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Event
        </button>
      </form>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-bold text-lg">{event.title}</h2>
            <p>{event.description}</p>
            <p className="text-sm text-gray-600">📍 {event.location}</p>
            <p className="text-sm text-gray-600">📅 {new Date(event.date).toDateString()}</p>
            <button
              onClick={() => handleDelete(event.id)}
              className="mt-2 text-red-600 hover:underline text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
