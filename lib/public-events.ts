// lib/public-events.ts
export async function getAllEventsPublic() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/events`, {
    method: 'GET',
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch events')
  }

  return res.json()
}
