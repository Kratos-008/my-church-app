// lib/public-events.ts
'use server'

export async function getAllEventsPublic() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'https://mgnbc-six.vercel.app/'}/api/events`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}
