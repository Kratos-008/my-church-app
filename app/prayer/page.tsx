'use client'

import { ChevronLeft, CheckCircle2, Heart } from 'lucide-react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { HeartHandshake } from '../components/icons/HeartHandshake'
import { useSession, signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

type Prayer = {
  id: string
  name: string | null
  request: string
  anonymous: boolean
  answered: boolean
  createdAt: string
}

export default function PrayerPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  // 🚨 Redirect if not logged in
  useEffect(() => {
    if (status === 'unauthenticated') {
      signIn()
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Checking authentication...</p>
      </div>
    )
  }

  if (!session) return null

  const [tab, setTab] = useState<"submit" | "current" | "answered">("submit")
  const [request, setRequest] = useState("")
  const [anonymous, setAnonymous] = useState(false)
  const [prayers, setPrayers] = useState<Prayer[]>([])

  // 📥 Load approved prayers
  useEffect(() => {
    const fetchPrayers = async () => {
      const res = await fetch("/api/prayer")
      if (res.ok) {
        const data = await res.json()
        setPrayers(data)
      }
    }
    fetchPrayers()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!request.trim()) return

    await fetch("/api/prayer", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ request, anonymous }),
    })

    setRequest("")
    setAnonymous(false)
    setTab("current")

    // refresh list
    const res = await fetch("/api/prayer")
    if (res.ok) {
      const data = await res.json()
      setPrayers(data)
    }
  }

  const currentPrayers = prayers.filter((p) => !p.answered)
  const answeredPrayers = prayers.filter((p) => p.answered)

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

      {/* Intro */}
      <div className="text-center p-6">
        <h2 className="text-3xl font-bold mb-2">Prayer Requests</h2>
        <p className="text-gray-600 max-w-xl mx-auto">
          Share your prayer requests with our church family. We believe in the
          power of prayer and are here to support you.
        </p>
        <div className="bg-white rounded-xl shadow p-6 my-6 max-w-xl mx-auto border">
          <p className="text-sm text-gray-800 font-medium text-center">
            "Therefore confess your sins to each other and pray for each other
            so that you may be healed. The prayer of a righteous person is
            powerful and effective."
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
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prayer Request *
              </label>
              <textarea
                required
                value={request}
                onChange={(e) => setRequest(e.target.value)}
                className="w-full border p-2 rounded-md mt-1"
                rows={4}
                placeholder="Share your prayer request here..."
              />
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="anon"
                checked={anonymous}
                onChange={(e) => setAnonymous(e.target.checked)}
                className="accent-blue-500"
              />
              <label htmlFor="anon" className="text-sm text-gray-600">
                Submit anonymously
              </label>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white w-full py-2 rounded-md hover:bg-blue-700 transition flex items-center justify-center space-x-2"
            >
              <span>🙏 Submit Prayer Request</span>
            </button>
          </form>
        </div>
      )}

      {/* Current Requests */}
      {tab === 'current' && (
        <div className="text-center text-gray-700 max-w-lg mx-auto mt-10 animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Current Prayer Requests</h2>
          <p className="text-sm mb-8">
            Please join us in praying for these requests from our church family.
          </p>
          {currentPrayers.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500">
              <HeartHandshake className="w-10 h-10 mb-2" />
              <p className="font-semibold">No Current Prayer Requests</p>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              {currentPrayers.map((r) => (
                <div key={r.id} className="border p-4 rounded-md shadow-sm bg-gray-50">
                  <p className="font-semibold text-blue-600">
                    {r.anonymous ? "Anonymous" : r.name || "Unknown"}
                  </p>
                  <p className="text-gray-700">{r.request}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Answered Requests */}
      {tab === 'answered' && (
        <div className="text-center text-gray-700 max-w-lg mx-auto mt-10 animate-fade-in">
          <h2 className="text-xl font-bold mb-2">Answered Prayers</h2>
          <p className="text-sm mb-8">
            Celebrate with us as we give thanks for these answered prayers!
          </p>
          {answeredPrayers.length === 0 ? (
            <div className="flex flex-col items-center text-gray-500">
              <CheckCircle2 className="w-10 h-10 mb-2" />
              <p className="font-semibold">No Answered Prayers Yet</p>
            </div>
          ) : (
            <div className="space-y-4 text-left">
              {answeredPrayers.map((r) => (
                <div key={r.id} className="border p-4 rounded-md shadow-sm bg-green-50">
                  <p className="font-semibold text-green-600">
                    {r.anonymous ? "Anonymous" : r.name || "Unknown"}
                  </p>
                  <p className="text-gray-700">{r.request}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Footer CTA */}
      <div className="text-center mt-16 bg-gradient-to-r from-green-500 to-blue-600 text-white py-10 px-4">
        <p className="text-xl font-semibold mb-2">We're Here to Pray With You</p>
        <p className="max-w-md mx-auto text-sm mb-6">
          Don’t face your challenges alone. Share your prayer requests with our
          loving church family.
        </p>
        <div className="flex justify-center flex-wrap gap-4">
          <Link
            href="/contact"
            className="bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 transition"
          >
            Contact a Pastor
          </Link>
          <Link
            href="/"
            className="bg-white text-black font-semibold px-5 py-2.5 rounded-md hover:bg-gray-100 transition"
          >
            Back to Home
          </Link>
        </div>
      </div>

      {/* Footer Info */}
      <footer className="bg-neutral-900 text-white py-6 text-center">
        <div className="flex justify-center items-center space-x-2">
          <Heart className="w-4 h-4 text-white" />
          <span className="font-medium">
            Masbate Good News Baptist Church
          </span>
        </div>
        <p className="text-sm mt-1 text-gray-300">
          Purok 7 Punta Nursery, Masbate City
        </p>
      </footer>
    </div>
  )
}
