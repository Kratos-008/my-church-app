import Link from 'next/link';

export default function Hero() {
  return (
    <section className="text-center py-12 animate-fade-in">
      <h2 className="text-3xl font-bold mb-2">Welcome to Our Church Family</h2>
      <p className="text-gray-600 mb-6">
        Join us in worship, fellowship, and service to God and our community.
        Everyone is welcome in our loving church family.
      </p>
      <div className="flex justify-center space-x-4">
        {/* Join Us Sunday → Services Page */}
        <Link href="/services">
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
            Join Us Sunday
          </button>
        </Link>

        {/* Prayer Request → Prayer Page */}
        <Link href="/prayer">
          <button className="border border-gray-400 px-4 py-2 rounded hover:bg-gray-100">
            Prayer Request
          </button>
        </Link>
      </div>
    </section>
  );
}