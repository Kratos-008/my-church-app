'use client';

import Link from "next/link";
import { CalendarX } from "lucide-react";

export default function ChurchEventsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50 animate-fade-in">
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
        <h1 className="text-3xl font-bold text-gray-900">Upcoming Events</h1>
        <p className="text-gray-600 mt-2">
          Join us for these special events and activities in our church community. Everyone is welcome!
        </p>
      </div>

      {/* Empty Events */}
      <div className="flex flex-col items-center justify-center py-20 text-center text-gray-600">
        <CalendarX className="w-16 h-16 mb-4 text-gray-400" />
        <h2 className="text-lg font-semibold">No Events Scheduled</h2>
        <p className="max-w-md mt-2">
          We don’t have any upcoming events scheduled at the moment. Check back soon for new activities and gatherings!
        </p>
      </div>

      {/* Stay Updated CTA */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-center py-10 px-4">
        <h2 className="text-2xl font-bold mb-2">Want to Stay Updated?</h2>
        <p className="mb-4">Join our church community and never miss an event. Contact us to get involved!</p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/contact"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium"
          >
            Contact Us
          </Link>
          <Link
            href="/"
            className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200 font-medium"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white text-center py-4 px-4">
        <p className="font-semibold">❤️ Masbate Good News Baptist Church</p>
        <p className="text-sm">Purok 7 Punta Nursery, Masbate City</p>
      </footer>
    </div>
  );
}