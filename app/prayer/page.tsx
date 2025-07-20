'use client'

import { ChevronLeft, CheckCircle2, Heart, BookOpen } from 'lucide-react'
import { useState } from 'react'
import Link from 'next/link'
import { HeartHandshake } from '../components/icons/HeartHandshake'

export default function PrayerPage() {
  const [tab, setTab] = useState<'submit' | 'current' | 'answered'>('submit')

  return (
    <div className="min-h-screen bg-white text-gray-800 animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 p-4 flex justify-between items-center text-white shadow-md">
        <Link href="/" className="flex items-center space-x-2 hover:underline">
          <ChevronLeft size={20} />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center space-x-2">
          <div className="bg-white rounded-full p-1 shadow">
            <HeartHandshake className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="font-bold text-lg">Prayer Requests</h1>
        </div>
      </div>

      {/* Intro Section */}
      <div className="text-center p-6">
        <h2 className="text-3xl font-bold mb-2">Prayer Requests</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Share your prayer requests with our church family. We believe in the power of prayer and are here to support you.
        </p>
        <div className="bg-white rounded-xl shadow p-6 my-6 max-w-xl mx-auto border">
          <p className="text-sm text-gray-800 font-medium text-center">
            "Therefore confess your sins to each other and pray for each other so that you may be healed. The prayer of a righteous person is powerful and effective."
          </p>
          <p className="text-right text-xs text-gray-500 mt-2">James 5:16</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 rounded-md inline-flex">
          {(['submit', 'current', 'answered'] as const).map((item) => (
            <button
              key={item}
              onClick={() => setTab(item)}
              className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                tab === item
                  ? 'bg-white text-black shadow'
                  : 'text-gray-500 hover:text-black'
              }`}
            >
              {item === 'submit' && 'Submit Request'}
              {item === 'current' && 'Current Requests'}
              {item === 'answered' && 'Answered Prayers'}
            </button>
          ))}
        </div>
      </div>

      {/* Submit Form */}
      {tab === 'submit' && (
  <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md animate-fade-in border">
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Your Name (Optional)</label>
        <input
          type="text"
          className="w-full border p-2 rounded-md mt-1"
          placeholder="Enter your name"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prayer Request *</label>
        <textarea
          required
          className="w-full border p-2 rounded-md mt-1"
          rows={4}
          placeholder="Share your prayer request here..."
        />
      </div>
      <div className="flex items-center space-x-2">
        <input type="checkbox" id="anon" className="accent-blue-500" />
        <label htmlFor="anon" className="text-sm text-gray-600">
          Submit anonymously
        </label>
      </div>
      <button
        type="submit"
        className="bg-black text-white w-full py-2 rounded-md hover:bg-gray-800 transition"
      >
        Submit Prayer Request
      </button>
    </form>
  </div>
)}
      {tab === 'current' && (
  <div className="text-center text-gray-700 max-w-lg mx-auto mt-10 animate-fade-in">
    <h2 className="text-xl font-bold mb-2">Current Prayer Requests</h2>
    <p className="text-sm mb-8">
      Please join us in praying for these requests from our church family.
    </p>
    <div className="flex flex-col items-center text-gray-500">
      <HeartHandshake className="w-10 h-10 mb-2" />
      <p className="font-semibold">No Current Prayer Requests</p>
      <p className="text-sm">There are no pending prayer requests at this time.</p>
    </div>
  </div>
)}

{tab === 'answered' && (
  <div className="text-center text-gray-700 max-w-lg mx-auto mt-10 animate-fade-in">
    <h2 className="text-xl font-bold mb-2">Answered Prayers</h2>
    <p className="text-sm mb-8">
      Celebrate with us as we give thanks for these answered prayers!
    </p>
    <div className="flex flex-col items-center text-gray-500">
      <CheckCircle2 className="w-10 h-10 mb-2" />
      <p className="font-semibold">No Answered Prayers Yet</p>
      <p className="text-sm">Answered prayers will be displayed here to celebrate God's faithfulness.</p>
    </div>
  </div>
)}

      {/* Footer CTA */}
      <div className="text-center mt-16 bg-gradient-to-r from-green-500 to-blue-600 text-white py-10 px-4">
        <p className="text-xl font-semibold mb-2">We're Here to Pray With You</p>
        <p className="max-w-md mx-auto text-sm mb-6">
          Don’t face your challenges alone. Share your prayer requests with our loving church family.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link href="/contact" className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-100 transition">
            Contact a Pastor
          </Link>
          <Link href="/" className="bg-white text-black px-6 py-2 rounded font-medium hover:bg-gray-100 transition">
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="bg-neutral-900 text-white py-6 text-center">
        <div className="flex justify-center items-center space-x-2">
          <Heart className="w-4 h-4 text-white" />
          <span className="font-medium">Masbate Good News Baptist Church</span>
        </div>
        <p className="text-sm mt-1 text-gray-300">Purok 7 Punta Nursery, Masbate City</p>
      </footer>
    </div>
  )
}