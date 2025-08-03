'use client'

import { useState, useEffect } from 'react'
import { createEvent, deleteEvent, updateEvent } from '@/lib/admin-events'

export interface EventData {
  id: string
  title: string
  description: string
  location: string
  date: string | Date
  time?: string
}

interface AdminEventClientProps {
  events: EventData[]
}

export default function AdminEventClient({ events: initialEvents }: AdminEventClientProps) {
  const [events, setEvents] = useState<EventData[]>([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [location, setLocation] = useState('')
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [editingId, setEditingId] = useState<string | null>(null)

  useEffect(() => {
    const formatted = initialEvents.map((e) => ({
      ...e,
      date: typeof e.date === 'string' ? e.date : new Date(e.date).toISOString(),
    }))
    setEvents(formatted)
  }, [initialEvents])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setLocation('')
    setDate('')
    setTime('')
    setEditingId(null)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const data = { title, description, location, date, time }

    if (editingId) {
      const updated = await updateEvent({ id: editingId, ...data })
      setEvents((prev) =>
        prev.map((e) =>
          e.id === editingId ? { ...updated, date: new Date(updated.date).toISOString() } : e
        )
      )
    } else {
      const newEvent = await createEvent(data)
      setEvents((prev) => [...prev, { ...newEvent, date: new Date(newEvent.date).toISOString() }])
    }

    resetForm()
  }

  const handleDelete = async (id: string) => {
    await deleteEvent(id)
    setEvents(events.filter((e) => e.id !== id))
  }

  const handleEdit = (event: EventData) => {
    setTitle(event.title)
    setDescription(event.description)
    setLocation(event.location)
    setDate(typeof event.date === 'string' ? event.date.split('T')[0] : '')
    setTime(event.time || '')
    setEditingId(event.id)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manage Events</h1>

      <form onSubmit={handleSubmit} className="space-y-4 mb-10 max-w-xl">
        <input
          name="title"
          type="text"
          placeholder="Event Title"
          className="w-full border p-2 rounded"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border p-2 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <input
          name="location"
          type="text"
          placeholder="Location"
          className="w-full border p-2 rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
        <div className="flex gap-4">
          <input
            name="date"
            type="date"
            className="w-full border p-2 rounded"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
          <input
            name="time"
            type="time"
            className="w-full border p-2 rounded"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {editingId ? 'Update Event' : 'Add Event'}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              className="text-sm text-gray-600 hover:underline"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <ul className="space-y-4">
        {events.map((event) => (
          <li key={event.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-bold text-lg">{event.title}</h2>
            <p>{event.description}</p>
            <p className="font-bold">📍 {event.location}</p>
            <p className="font-bold">📅 {new Date(event.date).toLocaleDateString()}</p>
            {event.time && <p className="font-bold">⏰ {event.time}</p>}
            <div className="mt-2 flex gap-4">
              <button
                onClick={() => handleEdit(event)}
                className="text-blue-600 hover:underline text-sm"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="text-red-600 hover:underline text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}