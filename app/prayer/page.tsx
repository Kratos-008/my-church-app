'use client';

import { ChevronLeft, CheckCircle2, BookOpen } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import { HeartHandshake } from '@/components/icons/HeartHandshake'; // ✅ custom SVG component

export default function PrayerPage() {
  const [tab, setTab] = useState<'submit' | 'current' | 'answered'>('submit');

  return (
    <div className="min-h-screen bg-white text-gray-800 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-400 to-blue-500 p-4 flex justify-between items-center text-white">
        <Link href="/" className="flex items-center space-x-2">
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1">
            <HeartHandshake className="w-5 h-5 text-red-500" />
          </div>
          <h1 className="font-bold text-lg">Prayer Requests</h1>
        </div>
      </div>

      {/* Intro + Bible Verse */}
      <div className="text-center p-4">
        <p className="text-gray-600">
          Share your prayer requests with our church family. We believe in the power of prayer and are here to support you.
        </p>
        <div className="bg-gray-100 rounded-lg p-4 my-4 shadow">
          <p className="italic text-sm">
            "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective."
          </p>
          <p className="text-right text-xs mt-2">— James 5:16</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-4">
        {(['submit', 'current', 'answered'] as const).map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`px-4 py-2 rounded-t-lg font-medium transition ${
              tab === item ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
            }`}
          >
            {item === 'submit' && 'Submit Request'}
            {item === 'current' && 'Current Requests'}
            {item === 'answered' && 'Answered Prayers'}
          </button>
        ))}
      </div>

      {/* Submit Request Form */}
      {tab === 'submit' && (
        <div className="max-w-md mx-auto bg-white p-6 rounded shadow animate-fade-in">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Your Name (Optional)</label>
              <input
                type="text"
                className="w-full border p-2 rounded"
                placeholder="Enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Prayer Request *</label>
              <textarea
                required
                className="w-full border p-2 rounded"
                rows={4}
                placeholder="Share your prayer request here..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="anon" />
              <label htmlFor="anon" className="text-sm">
                Submit anonymously
              </label>
            </div>
            <button
              type="submit"
              className="bg-black text-white w-full py-2 rounded hover:bg-gray-800"
            >
              Submit Prayer Request
            </button>
          </form>
        </div>
      )}

      {/* Placeholder for current or answered tabs */}
      {tab !== 'submit' && (
        <div className="max-w-md mx-auto text-center text-gray-500 mt-10 animate-fade-in">
          <div className="flex flex-col items-center">
            {tab === 'current' && <BookOpen className="w-8 h-8 mb-2 text-blue-400" />}
            {tab === 'answered' && <CheckCircle2 className="w-8 h-8 mb-2 text-green-400" />}
            <p>
              {tab === 'current'
                ? 'Current prayer requests will appear here.'
                : 'Answered prayers will appear here.'}
            </p>
          </div>
        </div>
      )}

      {/* Footer Call to Action */}
      <div className="text-center mt-10 bg-gradient-to-r from-green-400 to-blue-500 text-white py-6">
        <p className="text-lg font-semibold mb-2">We're Here to Pray With You</p>
        <p>
          Don’t face your challenges alone. Share your prayer requests with our loving church family.
        </p>
        <div className="mt-4 flex justify-center space-x-4">
          <button className="bg-white text-blue-600 px-4 py-2 rounded shadow hover:bg-blue-100">
            Contact a Pastor
          </button>
          <Link
            href="/"
            className="bg-white text-gray-600 px-4 py-2 rounded shadow hover:bg-gray-100"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center text-sm text-gray-600 py-4">
        © Masbate Good News Baptist Church<br />
        Purok 7, Punta Nursery, Masbate City
      </div>
    </div>
  );
}
