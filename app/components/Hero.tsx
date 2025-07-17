export default function Hero() {
  return (
    <section className="text-center py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2">Welcome to Our Church Family</h2>
      <p className="text-gray-600 mb-6">
        Join us in worship, fellowship, and service to God and our community.
        Everyone is welcome in our loving church family.
      </p>
      <div className="flex justify-center space-x-4">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Join Us Sunday</button>
        <button className="border border-gray-400 px-4 py-2 rounded">Prayer Request</button>
      </div>
    </section>
  )
}
