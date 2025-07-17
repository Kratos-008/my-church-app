export default function UpcomingEvents() {
  return (
    <section className="text-center py-8 animate-fade-in">
  <h3 className="text-xl font-semibold mb-2">Upcoming Events</h3>
  <button className="border px-3 py-1 rounded text-sm hover:bg-gray-100 mb-4">
    View All Events
  </button>
  <div className="max-w-md mx-auto bg-gray-100 p-4 rounded shadow">
    <p>No upcoming events at this time.</p>
  </div>
</section>
  )
}
